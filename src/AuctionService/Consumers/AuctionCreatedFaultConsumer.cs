using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
    {
        public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
        {
            System.Console.WriteLine("--> AuctionCreatedFaultConsumer: AuctionCreatedFaultConsumer");
            var exception = context.Message.Exceptions.First();
            if (exception.ExceptionType == "System.ArgumentException")
            {
                context.Message.Message.Model = "FooBar"; // fix model name to FooBar
                await context.Publish(context.Message.Message); // save the message again with the fixed model name to retry
            }
            else
            {
                Console.WriteLine("Not an argument exception - update error dashboard somewhere");
            }

        }
    }
}