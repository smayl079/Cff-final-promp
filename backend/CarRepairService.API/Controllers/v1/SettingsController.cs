using CarRepairService.Domain.Entities;
using CarRepairService.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CarRepairService.API.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/admin/[controller]")]
[Produces("application/json")]
[Tags("Admin Settings")]
public class SettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var settings = await _context.CompanySettings.FirstOrDefaultAsync();
        return Ok(settings);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] CompanySettings model)
    {
        var settings = await _context.CompanySettings.FirstOrDefaultAsync();
        
        if (settings == null)
        {
            _context.CompanySettings.Add(model);
        }
        else
        {
            settings.CompanyName = model.CompanyName;
            settings.ContactEmail = model.ContactEmail;
            settings.ContactPhone = model.ContactPhone;
            settings.Address = model.Address;
            settings.FacebookUrl = model.FacebookUrl;
            settings.TwitterUrl = model.TwitterUrl;
            settings.InstagramUrl = model.InstagramUrl;
            settings.WorkingHours = model.WorkingHours;
            
            _context.CompanySettings.Update(settings);
        }

        await _context.SaveChangesAsync();
        return Ok(settings ?? model);
    }
}
