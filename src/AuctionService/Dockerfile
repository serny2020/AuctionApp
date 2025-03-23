# ----------------------------------------
# Step 1: Build the Application
# ----------------------------------------

# Use the official .NET SDK image (8.0) to build the application.
# This includes compilers and build tools.
FROM mcr.microsoft.com/dotnet/sdk:8.0 as build 

# Set the working directory inside the container
WORKDIR /app

# Expose port 80 for the application
EXPOSE 80

# ----------------------------------------
# Step 2: Restore Dependencies
# ----------------------------------------

# Copy the solution file and project files separately.
# This takes advantage of Docker's layer caching, allowing efficient rebuilds.
COPY AuctionApp.sln AuctionApp.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj

# Restore dependencies for all projects in the solution.
# This will download and cache NuGet packages.
RUN dotnet restore AuctionApp.sln

# ----------------------------------------
# Step 3: Build and Publish the Application
# ----------------------------------------

# Copy the actual source code files into the container.
COPY src/AuctionService src/AuctionService
COPY src/Contracts src/Contracts

# Set the working directory to the AuctionService project
WORKDIR /app/src/AuctionService

# Build and publish the application in Release mode.
# The output files will be stored in the `/app/src/out` directory.
RUN dotnet publish -c Release -o /app/src/out

# ----------------------------------------
# Step 4: Create the Runtime Image
# ----------------------------------------

# Use a smaller, production-optimized .NET runtime image.
# This image is lightweight and does not include the SDK.
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory inside the runtime container.
WORKDIR /app

# Copy the compiled application files from the build container.
COPY --from=build /app/src/out .

# Set the default command to run the application when the container starts.
ENTRYPOINT [ "dotnet", "AuctionService.dll" ]
