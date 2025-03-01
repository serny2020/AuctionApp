using AuctionService.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class ActionDbContext : DbContext
{
    public ActionDbContext(DbContextOptions<ActionDbContext> options) : base(options)
    {
    }

    public DbSet<Auction> Auctions { get; set; }
    public DbSet<Item> Items { get; set; }
}