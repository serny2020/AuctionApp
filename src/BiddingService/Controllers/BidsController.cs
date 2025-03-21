using BiddingService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
namespace BiddingService.Controllers;

[ApiController] // defines an API controller
[Route("api/[controller]")] // defines the URL pattern for the controller
// BidsController class is an API controller for handling bids
public class BidsController : ControllerBase
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Bid>> PlaceBid(string auctionId, int amount)
    {
        var auction = await DB.Find<Auction>().OneAsync(auctionId);

        if (auction == null)
        {
            // TODO: grpc check with auction service if that has auction 
            return NotFound();
        }

        if (auction.Seller == User.Identity.Name)
        {
            return BadRequest("You cannot bid on your own auction");
        }

        var bid = new Bid
        {
            Amount = amount,
            AuctionId = auctionId,
            Bidder = User.Identity.Name
        };

        // If the auction has ended, mark the bid as finished
        if (auction.AuctionEnd < DateTime.UtcNow)
        {
            bid.BidStatus = BidStatus.Finished;
        }
        else // If the auction is still ongoing, check if the bid is the highest
        {
            var highBid = await DB.Find<Bid>()
                .Match(a => a.AuctionId == auctionId)
                .Sort(b => b.Descending(x => x.Amount))
                .ExecuteFirstAsync();

            // If the bid is higher than the current highest bid 
            // or if there is no high bid, accept it
            if (highBid != null && amount > highBid.Amount || highBid == null)
            {
                bid.BidStatus = amount > auction.ReservePrice
                    ? BidStatus.Accepted
                    : BidStatus.AcceptedBelowReserve;
            }

            // If the new bid is lower or equal to the current highest bid, mark it as too low
            if (highBid != null && bid.Amount <= highBid.Amount)
            {
                bid.BidStatus = BidStatus.TooLow;
            }

        }


        await DB.SaveAsync(bid);

        return Ok(bid);
    }

    [HttpGet("{auctionId}")]
    public async Task<ActionResult<List<Bid>>> GetBidsForAuction(string auctionId)
    {
        var bids = await DB.Find<Bid>()
            .Match(a => a.AuctionId == auctionId)
            .Sort(b => b.Descending(a => a.BidTime))
            .ExecuteAsync();

        return bids;
    }
}