# Use the official .NET SDK (8.0) as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 as build

# Set the working directory inside the container
WORKDIR /app

# Expose port 80 to allow the application to be accessed externally
EXPOSE 80

# ----------------------------------------
# Step 1: Restore Dependencies Efficiently
# ----------------------------------------

# Copy the solution file and individual project files to the container.
# This allows Docker to cache the dependency layers efficiently.
COPY AuctionApp.sln AuctionApp.sln
COPY src/AuctionService/AuctionService.csproj src/AuctionService/AuctionService.csproj
COPY src/SearchService/SearchService.csproj src/SearchService/SearchService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/BiddingService/BiddingService.csproj src/BiddingService/BiddingService.csproj
COPY src/Contracts/Contracts.csproj src/Contracts/Contracts.csproj
COPY src/IdentityService/IdentityService.csproj src/IdentityService/IdentityService.csproj

# Restore NuGet dependencies for all projects in the solution
RUN dotnet restore AuctionApp.sln

# ----------------------------------------
# Step 2: Copy Source Code and Build the Application
# ----------------------------------------

# Copy the source code files into the container
COPY src/SearchService src/SearchService
COPY src/Contracts src/Contracts

# Set the working directory to the SearchService project
WORKDIR /app/src/SearchService

# Publish the application in Release mode to the specified output directory
RUN dotnet publish -c Release -o /app/src/out

# ----------------------------------------
# Step 3: Create the Runtime Image
# ----------------------------------------

# Use a lightweight .NET runtime image (without SDK) for production
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the published application files from the build container
COPY --from=build /app/src/out .

# Set the default command to run the application
ENTRYPOINT [ "dotnet", "SearchService.dll" ]
