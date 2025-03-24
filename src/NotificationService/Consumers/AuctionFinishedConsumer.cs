using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;
using Contracts;
using MassTransit;

namespace NotificationService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly IHubContext<NotificationHubs> _hubContext;

    public AuctionFinishedConsumer(IHubContext<NotificationHubs> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("--> auction finished message received");

        // Fan out the message to all connected clients
        await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
    }

}
