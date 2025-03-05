using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// builder.Services.AddMassTransit(x =>
// {
//     x.UsingRabbitMq((context, cfg) =>
//     {
//         cfg.Host("rabbitmq", "/", h =>
//         {
//             h.Username("guest");
//             h.Password("guest");
//         });

//         cfg.ConfigureEndpoints(context);
//     });
// });

builder.Services.AddMassTransit(x =>
{
    x.AddEntityFrameworkOutbox<AuctionDbContext>(
    o =>
    {
        o.QueryDelay = TimeSpan.FromSeconds(10);
        o.UsePostgres();
        o.UseBusOutbox();
    });

    x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction-service", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ConfigureEndpoints(context);
    });
});


// builder.Services.AddMassTransit(x =>
// {
//     x.UsingRabbitMq((context, cfg) =>
//     {
//         cfg.ConfigureEndpoints(context);
//     });
// });

// Add authentication services to the application's service collection
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Set the identity provider (authority) URL where the JWT tokens are issued.
        // This should be the URL of the identity provider, like IdentityServer or Auth0.
        options.Authority = builder.Configuration["IdentityServiceUrl"];

        // Disable HTTPS metadata validation.
        // This is useful for development environments where HTTPS is not enforced.
        // Currently, the identity provider is using HTTP in the development environment.
        // In production, it should be set to true.
        options.RequireHttpsMetadata = false;

        // Disable audience validation.
        // If enabled, it would check whether the token is meant for this API (matching the audience claim).
        // Setting this to false means the API will accept tokens without enforcing audience checks.
        options.TokenValidationParameters.ValidateAudience = false;

        // Specify which claim should be used as the user's name in the token.
        // Here, we use the claim named "username" to represent the authenticated user’s name.
        options.TokenValidationParameters.NameClaimType = "username";
    });


var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

app.Run();

