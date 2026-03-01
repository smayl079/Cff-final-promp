using Microsoft.Extensions.DependencyInjection;
using CarRepairService.Application.Interfaces;
using CarRepairService.Application.Services;
using FluentValidation;
using System.Reflection;

namespace CarRepairService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register AutoMapper
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        // Register FluentValidation validators
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        // Register Application Services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IAppointmentService, AppointmentService>();
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<IVehicleService, VehicleService>();
        services.AddScoped<IServiceCatalogService, ServiceCatalogService>();
        services.AddScoped<IMechanicService, MechanicService>();
        services.AddScoped<IEmailService, EmailService>();

        return services;
    }
}
