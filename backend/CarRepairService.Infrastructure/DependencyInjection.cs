using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CarRepairService.Infrastructure.Data;
using CarRepairService.Application.Interfaces;
using CarRepairService.Infrastructure.Services;

namespace CarRepairService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Register DbContext
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        // Register Repositories
        // services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        // services.AddScoped<IAppointmentRepository, AppointmentRepository>();
        // services.AddScoped<IUnitOfWork, UnitOfWork>();
        
        services.AddScoped<IExpertService, ExpertService>();

        return services;
    }
}
