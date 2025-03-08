using System;
using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService;

// The BidPlacedConsumer class implements the IConsumer interface for the BidPlaced message.
// This means it defines how to process incoming BidPlaced messages.
public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    // Private readonly field for accessing the auction database context.
    private readonly AuctionDbContext _dbContext;

    // Constructor that receives an AuctionDbContext instance via dependency injection.
    public BidPlacedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // The Consume method is called when a BidPlaced message is received.
    // It processes the message asynchronously.
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("--> Consuming bid placed");

        // Retrieve the auction corresponding to the AuctionId from the message.
        // The FindAsync method searches the Auctions DbSet for the auction with the given AuctionId.
        var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);

        // Check if the auction's current highest bid is null (i.e., no bids yet),
        // OR if the bid status contains "Accepted" and the new bid amount is higher than the current high bid.
        // This conditional ensures that only valid and higher bids update the auction.
        if (auction.CurrentHighBid == null
            || context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > auction.CurrentHighBid)
        {
            // Update the auction's current highest bid with the new bid amount from the message.
            auction.CurrentHighBid = context.Message.Amount;

            // Save the changes to the database asynchronously.
            await _dbContext.SaveChangesAsync();
        }
    }
}