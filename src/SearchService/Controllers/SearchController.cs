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
    /// Searches for items based on the provided search term.
    /// </summary>
    /// <param name="searchItem">The search term to look for.</param>
    /// <returns>A list of items that match the search term.</returns>
    public async Task<IActionResult> SearchItems(string searchTerm)
    {
        var query = DB.Find<Item>()
                      .Sort(x => x.Ascending(a => a.Make));

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query.Match(Search.Full, searchTerm).SortByTextScore();
        }

        var items = await query.ExecuteAsync();

        return Ok(items);
    }
    
}      
