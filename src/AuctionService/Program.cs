using AuctionService;
using AuctionService.Consumers;
using AuctionService.Data;
using AuctionService.Services;
using Grpc.AspNetCore.Server;
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
        o.QueryDelay = TimeSpan.FromSeconds(5);
        o.UsePostgres();
        o.UseBusOutbox();
    });

    // Scans the namespace that contains AuctionCreatedFaultConsumer and registers all consumer classes found there.
    x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction-service", false));

    // Configuring RabbitMQ for message communication
    x.UsingRabbitMq((context, cfg) =>
    {
        // Configure RabbitMQ host from application configuration settings
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
            // Set username from configuration, defaulting to "guest" if not provided
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));

            // Set password from configuration, defaulting to "guest" if not provided
            host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });

        // Configure a fallback RabbitMQ host using localhost with default guest credentials
        // cfg.Host("localhost", "/", h =>
        // {
        //     h.Username("guest");
        //     h.Password("guest");
        // });

        // Configure endpoints automatically based on consumers found in the application
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

builder.Services.AddGrpc();

var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGrpcService<GrpcAuctionService>();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

app.Run();

