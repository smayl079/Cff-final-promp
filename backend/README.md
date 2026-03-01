# Car Repair Service - Backend API

## Architecture

This project follows Clean Architecture principles with the following layers:

### Projects

- **CarRepairService.API** - Presentation layer (Controllers, Middleware)
- **CarRepairService.Application** - Business logic layer (Services, DTOs, Validators)
- **CarRepairService.Domain** - Core domain layer (Entities, Interfaces)
- **CarRepairService.Infrastructure** - Data access layer (Repositories, DbContext)

## Technology Stack

- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- AutoMapper
- FluentValidation
- Swagger/OpenAPI

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code

### Setup

1. Update connection string in `appsettings.json`
2. Run migrations: `dotnet ef database update`
3. Run the project: `dotnet run --project CarRepairService.API`
4. Access Swagger UI: `https://localhost:5001/swagger`

## API Documentation

API documentation is available via Swagger UI when running the application.

## Project Structure

```
backend/
├── CarRepairService.API/          # Presentation Layer
├── CarRepairService.Application/  # Business Logic Layer
├── CarRepairService.Domain/       # Core Domain Layer
└── CarRepairService.Infrastructure/ # Data Access Layer
```
