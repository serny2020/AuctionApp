using System;

namespace Contracts;
/// <summary>
/// Represents an event that is triggered when an auction is completed.
/// This class is used as a contract for communication between microservices.
/// </summary>
/// <remarks>
/// Possible use cases:
/// - Used in event-driven architecture (e.g., RabbitMQ, Kafka) to notify other services.
/// - Can be used as a Data Transfer Object (DTO) in API responses.
/// - Ensures that auction-related data is structured and consistent across services.
/// </remarks>
public class AuctionFinished
{
    public bool ItemSold { get; set; }
    public required string AuctionId { get; set; }
    public string Winner { get; set; }
    public required string Seller { get; set; }
    public int? Amount { get; set; }
}