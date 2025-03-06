var builder = WebApplication.CreateBuilder(args);

// Add YARP services to the container.
// This will load the configuration from the "ReverseProxy" section of the appsettings.json file.
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

// Configure the HTTP request pipeline.
// This will add the reverse proxy middleware to the pipeline.
app.MapReverseProxy();

app.MapGet("/", () => "Hello World!");

app.Run();
