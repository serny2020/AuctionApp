using System;
using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

/// <summary>
/// Consumer that listens for the "AuctionFinished" event and updates the auction status.
/// </summary>
public class AuctionFinishedConsumer : IConsumer<AuctionFinished> // Implements MassTransit consumer interface
{
    private readonly AuctionDbContext _dbContext; // Database context for interacting with the auctions table.

    /// <summary>
    /// Constructor for dependency injection of AuctionDbContext.
    /// </summary>
    public AuctionFinishedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Handles the "AuctionFinished" event and updates the auction details in the database.
    /// </summary>
    /// <param name="context">The message context containing the auction event details.</param>
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("--> Consuming auction finished"); // Logging the event consumption.

        // Retrieve the auction record from the database using the provided AuctionId.
        // NOTE: FindAsync requires a Guid type for the primary key.
        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

        // If the item was sold, update the winner and the sold amount.
        if (context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;     // Set the winner of the auction.
            auction.SoldAmount = context.Message.Amount; // Store the final bid amount.
        }

        // Determine the auction's final status based on whether it met the reserve price.
        auction.Status = auction.SoldAmount > auction.ReservePrice
            ? Status.Finished  // If the sold amount is greater than the reserve price, mark it as finished.
            : Status.ReserveNotMet; // Otherwise, mark it as reserve price not met.

        // Persist the changes to the database.
        await _dbContext.SaveChangesAsync();
    }
}