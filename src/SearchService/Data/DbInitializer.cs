using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data
{
    public class DbInitializer
    {
        public static async Task InitDB(WebApplication app)
        {
            await DB.InitAsync("SearchDB", MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDBConnection")));

            await DB.Index<Item>()
                .Key(a => a.Make, KeyType.Text)
                .Key(a => a.Model, KeyType.Text)
                .Key(a => a.Color, KeyType.Text)
                .CreateAsync();

            var count = await DB.CountAsync<Item>();

            // if (count == 0) {
            //     System.Console.WriteLine("No data found. Seeding data...");
            //     var itemData = await System.IO.File.ReadAllTextAsync("Data/auctions.json");
            //     var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            //     var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);
            //     await DB.SaveAsync(items);
            // }
            using var scope = app.Services.CreateScope();
            var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();

            var items = await httpClient.GetItemsForSearchDb();

            Console.WriteLine(items.Count + " returned from the auction service");

            if (items.Count > 0)
            {
                await DB.SaveAsync(items);
            }

        }
    }
}