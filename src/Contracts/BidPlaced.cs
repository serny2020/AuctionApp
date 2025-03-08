namespace Contracts;

/// <summary>
/// Represents an event triggered when a bid is placed in an auction.
/// This contract is used for communication between microservices.
/// </summary>
/// <remarks>
/// Usage:
/// - Can be published to a message broker (e.g., RabbitMQ, Kafka) to notify other services.
/// - Used as a Data Transfer Object (DTO) for bid-related transactions.
/// - Ensures that bidding data is consistently structured across services.
/// </remarks>
public class BidPlaced
{
    public required string Id { get; set; }
    public required string AuctionId { get; set; }
    public required string Bidder { get; set; }
    public DateTime BidTime { get; set; }
    public int Amount { get; set; }
    public required string BidStatus { get; set; }
}
