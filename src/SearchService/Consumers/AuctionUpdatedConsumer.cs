using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

// this will affect the way the consumer is registered in the Startup.cs file
// namespace must match the folder structure
// the logical organization determines how the classes are registered
// in the Startup.cs file, the namespace is used to register the consumers
// not the physical location of the files
namespace SearchService.Consumers; 

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    // the dependency is injected via the constructor
    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("--> Consuming auction updated: " + context.Message.Id);

        var item = _mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .Match(a => a.ID == context.Message.Id)
            .ModifyOnly(x => new
            {
                x.Color,
                x.Make,
                x.Model,
                x.Year,
                x.Mileage
            }, item)
            .ExecuteAsync();

        if (!result.IsAcknowledged)
            throw new MessageException(typeof(AuctionUpdated), "Problem updating mongodb");

    }
}

// using AutoMapper;
// using Contracts;
// using MassTransit;
// using MongoDB.Entities;
// using SearchService.Models;
// namespace SearchService.Consumers;


//// The dependency is injected directly in the class declaration via a primary 
// // constructor parameter ((IMapper mapper)).
// public class AuctionUpdatedConsumer(IMapper mapper) : IConsumer<AuctionUpdated>
// {
//     public async Task Consume(ConsumeContext<AuctionUpdated> context)
//     {
//         Console.WriteLine("--> Consuming auction updated: " + context.Message.Id);

//         var item = mapper.Map<Item>(context.Message);

//         var result = await DB.Update<Item>()
//             .Match(a => a.ID == context.Message.Id)
//             .ModifyOnly(x => new 
//             {
//                 x.Color,
//                 x.Make,
//                 x.Model,
//                 x.Year,
//                 x.Mileage
//             }, item)
//             .ExecuteAsync();

//         if (!result.IsAcknowledged)
//             throw new MessageException(typeof(AuctionUpdated), "Problem updating mongoDb");
//     }
// }