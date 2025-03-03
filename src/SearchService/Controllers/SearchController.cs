using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;

using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{

    [HttpGet]
    /// <summary>
    /// Searches for items based on the provided search term with pagination.
    /// </summary>
    /// <param name="searchTerm">The search term to look for.</param>
    /// <param name="pageNumber">The page number to retrieve.</param>
    /// <param name="pageSize">The number of items per page.</param>
    /// <returns>A list of items that match the search term.</returns>
public async Task<ActionResult<List<Item>>> SearchItems([FromQuery] SearchParams searchParams)
{
    var query = DB.PagedSearch<Item, Item>();

    if (!string.IsNullOrEmpty(searchParams.SearchTerm))
    {
        query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
    }

    query = searchParams.OrderBy switch
    {
        "make" => query.Sort(x => x.Ascending(a => a.Make)),
        "new" => query.Sort(x => x.Descending(a => a.CreatedAt)),
        _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
    };

    query = searchParams.FilterBy switch
    {
        "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
        "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6)
                        && x.AuctionEnd > DateTime.UtcNow),
        _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
    };

    if (!string.IsNullOrEmpty(searchParams.Seller))
    {
        query.Match(x => x.Seller == searchParams.Seller);
    }

    if (!string.IsNullOrEmpty(searchParams.Winner))
    {
        query.Match(x => x.Winner == searchParams.Winner);
    }

    query.PageNumber(searchParams.PageNumber);
    query.PageSize(searchParams.PageSize);

    var items = await query.ExecuteAsync();
        return Ok(new { results = items.Results, pageCount=items.PageCount, totalCount=items.TotalCount });
    }
    
}      
