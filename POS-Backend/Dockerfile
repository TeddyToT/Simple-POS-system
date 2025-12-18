#Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy csproj & restore
COPY *.csproj ./
RUN dotnet restore

# Copy source
COPY . ./
RUN dotnet publish -c Release -o out

#Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

# Listen port 7089
ENV ASPNETCORE_URLS=http://+:7089

COPY --from=build /app/out ./

EXPOSE 7089
ENTRYPOINT ["dotnet", "POS-Backend.dll"]
