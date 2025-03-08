using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    /// <summary>
    /// Consumer for handling fault messages related to AuctionCreated events.
    /// When processing an AuctionCreated message fails, a fault message is generated.
    /// This consumer checks if the fault is due to a System.ArgumentException.
    /// If so, it corrects the AuctionCreated message's model by setting it to "FooBar"
    /// and republishes the message to retry processing. Otherwise, it logs the error
    /// for further investigation (e.g., updating an error dashboard).
    /// </summary>
    public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
    {
        /// <summary>
        /// Consumes the fault message for an AuctionCreated event.
        /// </summary>
        /// <param name="context">The context containing the fault message and exception details.</param>
        public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
        {
            System.Console.WriteLine("--> AuctionCreatedFaultConsumer: AuctionCreatedFaultConsumer");

            // Retrieve the first exception from the fault message.
            var exception = context.Message.Exceptions.First();

            // If the exception is an ArgumentException, fix the model and retry.
            if (exception.ExceptionType == "System.ArgumentException")
            {
                // Correct the model name to "FooBar" and republish the message for a retry.
                context.Message.Message.Model = "FooBar";
                await context.Publish(context.Message.Message);
            }
            else
            {
                // For other exception types, log the issue for further handling.
                Console.WriteLine("Not an argument exception - update error dashboard somewhere");
            }
        }
    }
}
