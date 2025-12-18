# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.sln .
COPY POS_Backend/*.csproj ./POS_Backend/
RUN dotnet restore

# Copy all source code and publish
COPY POS_Backend/. ./POS_Backend/
WORKDIR /app/POS_Backend
RUN dotnet publish -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/POS_Backend/out ./

# Expose port
EXPOSE 7089

# Entrypoint
ENTRYPOINT ["dotnet", "POS_Backend.dll"]
