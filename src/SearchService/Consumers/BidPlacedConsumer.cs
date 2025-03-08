using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

/// <summary>
/// Consumer for processing BidPlaced messages.
/// Retrieves the auction related to the bid and updates its current high bid if the bid is valid.
/// </summary>
/// <remarks>
/// - If the auction is not found, a MessageException is thrown.
/// - A bid is considered valid if either no bid has been placed yet,
///   or if the bid status is "Accepted" and the new bid amount is greater than the current high bid.
/// </remarks>
public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        // Log that a bid placement is being processed.
        Console.WriteLine("--> Consuming bid placed");

        // Retrieve the auction using the AuctionId provided in the BidPlaced message.
        // If the auction cannot be found, throw a MessageException.
        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId)
            ?? throw new MessageException(typeof(AuctionFinished), "Cannot retrieve this auction");

        // Check if there's no current high bid,
        // or if the bid is marked as "Accepted" and the new bid amount is greater than the current high bid.
        if (auction.CurrentHighBid == null
            || context.Message.BidStatus.Contains("Accepted")
            && context.Message.Amount > auction.CurrentHighBid)
        {
            // Update the auction's current high bid to the new bid amount.
            auction.CurrentHighBid = context.Message.Amount;
            // Save the updated auction details asynchronously.
            await auction.SaveAsync();
        }
    }
}
