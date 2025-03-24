using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add YARP services to the container.
// This will load the configuration from the "ReverseProxy" section of the appsettings.json file.
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// Add authentication services to the container.
// This will load the configuration from the "IdentityServiceUrl" section of the appsettings.json file.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

// Adding Cross-Origin Resource Sharing (CORS) policy to the service collection
builder.Services.AddCors(options =>
{
    options.AddPolicy("customPolicy", b =>
    {
        b.AllowAnyHeader()  // Allows any headers in requests (e.g., Authorization, Content-Type)
         .AllowAnyMethod()  // Allows any HTTP methods (GET, POST, PUT, DELETE, etc.)
         .AllowCredentials()  // Allows credentials (cookies, authentication headers, etc.)
         .WithOrigins(builder.Configuration["ClientApp"]);  // Restricts access to the specified client origin
    });
});

// Build the application
var app = builder.Build();

// Apply the configured CORS policy to the application
app.UseCors();


// Configure the HTTP request pipeline.
// This will add the reverse proxy middleware to the pipeline.
app.MapReverseProxy();

// Add authentication and Authorization to the pipeline.
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello World!");

app.Run();
