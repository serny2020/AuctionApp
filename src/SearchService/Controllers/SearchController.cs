using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;

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
    public async Task<IActionResult> SearchItems(string searchTerm, int pageNumber = 1, int pageSize = 4)
    {
        var query = DB.PagedSearch<Item>()
                      .Sort(x => x.Ascending(a => a.Make));

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query.Match(Search.Full, searchTerm).SortByTextScore();
        }
        query.PageSize(pageSize);
        query.PageNumber(pageNumber);
        var items = await query.ExecuteAsync();

        return Ok(new { results = items.Results, pageCount=items.PageCount, totalCount=items.TotalCount });
    }
    
}      
