using CarRepairService.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarRepairService.API.Controllers.v1;

/// <summary>
/// Admin dashboard endpoints
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/[controller]")]
[Produces("application/json")]
[Tags("Admin")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public DashboardController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("stats")]
    // [Authorize(Roles = "Admin")] // Uncomment when auth is fully hooked up
    public async Task<IActionResult> GetStats()
    {
        var totalServices = await _dbContext.Services.CountAsync();
        var totalBookings = await _dbContext.Appointments.CountAsync();
        var totalCustomers = await _dbContext.Customers.CountAsync();
        var totalMechanics = await _dbContext.Mechanics.CountAsync();
        var unreadMessages = await _dbContext.ContactMessages.CountAsync(m => !m.IsRead);

        return Ok(new
        {
            TotalServices = totalServices,
            TotalBookings = totalBookings,
            TotalCustomers = totalCustomers,
            TotalMechanics = totalMechanics,
            UnreadMessages = unreadMessages,
            RecentBookings = await _dbContext.Appointments
                .Include(a => a.Customer)
                .Include(a => a.Mechanic)
                .OrderByDescending(a => a.CreatedAt)
                .Take(5)
                .Select(a => new {
                    Id = a.Id,
                    CustomerName = a.Customer.FirstName + " " + a.Customer.LastName,
                    ServiceId = a.VehicleId, // Simplify if no navigation
                    Date = a.ScheduledDate,
                    Status = a.Status.ToString()
                }).ToListAsync()
        });
    }
}
