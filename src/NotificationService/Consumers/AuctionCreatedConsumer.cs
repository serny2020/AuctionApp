using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using NotificationService.Hubs;

namespace NotificationService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IHubContext<NotificationHubs> _hubContext;

    public AuctionCreatedConsumer(IHubContext<NotificationHubs> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("--> auction created message received");

        // Fan out the message to all connected clients (using websockets)
        await _hubContext.Clients.All.SendAsync("AuctionCreated", context.Message);
    }
}
