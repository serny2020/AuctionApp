using System;
using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

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
    // public async Task Consume(ConsumeContext<BidPlaced> context)
    // {
    //     Console.WriteLine("--> Consuming bid placed");

    //     // Retrieve the auction corresponding to the AuctionId from the message.
    //     // The FindAsync method searches the Auctions DbSet for the auction with the given AuctionId.
    //     // NOTE: FindAsync needs Guid type
    //     // var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);
    //     var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

    //     // Check if the auction's current highest bid is null (i.e., no bids yet),
    //     // OR if the bid status contains "Accepted" and the new bid amount is higher than the current high bid.
    //     // This conditional ensures that only valid and higher bids update the auction.
    //     if (auction.CurrentHighBid == null
    //         || context.Message.BidStatus.Contains("Accepted")
    //         && context.Message.Amount > auction.CurrentHighBid)
    //     {
    //         // Update the auction's current highest bid with the new bid amount from the message.
    //         auction.CurrentHighBid = context.Message.Amount;

    //         await _dbContext.SaveChangesAsync();

    //     }
    // }

    public async Task Consume(ConsumeContext<BidPlaced> context)
{
    Console.WriteLine("--> Consuming bid placed");

    // Retrieve the auction corresponding to the AuctionId from the message.
    var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

    if (auction == null)
    {
        Console.WriteLine($"Auction with ID {context.Message.AuctionId} not found.");
        return;
    }

    // Log the current state of the auction before any changes
    Console.WriteLine($"Current highest bid: {auction.CurrentHighBid}");

    // Check if the auction's current highest bid is null (i.e., no bids yet),
    // OR if the bid status contains "Accepted" and the new bid amount is higher than the current high bid.
    if (auction.CurrentHighBid == null
        || (context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > auction.CurrentHighBid))
    {
        // Update the auction's current highest bid with the new bid amount from the message.
        auction.CurrentHighBid = context.Message.Amount;

        // Log the changes
        Console.WriteLine($"New highest bid: {auction.CurrentHighBid}");

        // Save the changes to the database
        await _dbContext.SaveChangesAsync();

        // After saving, ensure the changes were persisted
        var updatedAuction = await _dbContext.Auctions.FindAsync(auction.Id);
        if (updatedAuction?.CurrentHighBid == auction.CurrentHighBid)
        {
            Console.WriteLine("Auction updated successfully.");
        }
        else
        {
            Console.WriteLine("Failed to update auction.");
        }
    }
}

}