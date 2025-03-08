using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    // This method is called when an AuctionFinished message is received.
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        // Retrieve the auction (represented as an Item) using the AuctionId from the message.
        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
        
        // Check if the auction resulted in a sale.
        if (context.Message.ItemSold)
        {
            // Update the auction record with the winner and the sold amount.
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = (int)context.Message.Amount;
        }

        // Mark the auction as finished regardless of the sale outcome.
        auction.Status = "Finished";

        // Save the updated auction record back to the database.
        await auction.SaveAsync();
    }
}

