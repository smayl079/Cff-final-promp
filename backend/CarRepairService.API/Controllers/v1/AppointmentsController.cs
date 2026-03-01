using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.DTOs.Responses;
using CarRepairService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairService.API.Controllers.v1;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Authorize]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentService _appointmentService;
    private readonly ILogger<AppointmentsController> _logger;

    public AppointmentsController(
        IAppointmentService appointmentService,
        ILogger<AppointmentsController> logger)
    {
        _appointmentService = appointmentService;
        _logger = logger;
    }

    /// <summary>
    /// Get all appointments (Admin/Manager only)
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Admin,Manager")]
    [ProducesResponseType(typeof(IEnumerable<AppointmentResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        _logger.LogInformation("Fetching all appointments");
        var appointments = await _appointmentService.GetAllAsync(pageNumber, pageSize);
        return Ok(appointments);
    }

    /// <summary>
    /// Get appointment by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(AppointmentResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var appointment = await _appointmentService.GetByIdAsync(id);
        
        if (appointment == null)
            return NotFound(new { message = $"Appointment with ID {id} not found" });

        return Ok(appointment);
    }

    /// <summary>
    /// Get appointments for the authenticated customer
    /// </summary>
    [HttpGet("my-appointments")]
    [Authorize(Roles = "Customer")]
    [ProducesResponseType(typeof(IEnumerable<AppointmentResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetMyAppointments()
    {
        var userId = User.FindFirst("sub")?.Value;
        
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var appointments = await _appointmentService.GetByCustomerIdAsync(Guid.Parse(userId));
        return Ok(appointments);
    }

    /// <summary>
    /// Create a new appointment
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Customer,Admin,Manager")]
    [ProducesResponseType(typeof(AppointmentResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateAppointmentDto createDto)
    {
        _logger.LogInformation("Creating new appointment");
        
        var result = await _appointmentService.CreateAsync(createDto);
        
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>
    /// Update an existing appointment
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    [ProducesResponseType(typeof(AppointmentResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateAppointmentDto updateDto)
    {
        _logger.LogInformation("Updating appointment {AppointmentId}", id);
        
        var result = await _appointmentService.UpdateAsync(id, updateDto);
        
        if (result == null)
            return NotFound(new { message = $"Appointment with ID {id} not found" });

        return Ok(result);
    }

    /// <summary>
    /// Update appointment status
    /// </summary>
    [HttpPatch("{id}/status")]
    [Authorize(Roles = "Admin,Manager,Mechanic")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateAppointmentStatusDto statusDto)
    {
        var result = await _appointmentService.UpdateStatusAsync(id, statusDto.Status);
        
        if (!result)
            return NotFound(new { message = $"Appointment with ID {id} not found" });

        return Ok(new { message = "Status updated successfully" });
    }

    /// <summary>
    /// Cancel an appointment
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Customer,Admin,Manager")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Cancel(Guid id)
    {
        _logger.LogInformation("Cancelling appointment {AppointmentId}", id);
        
        var result = await _appointmentService.CancelAsync(id);
        
        if (!result)
            return NotFound(new { message = $"Appointment with ID {id} not found" });

        return Ok(new { message = "Appointment cancelled successfully" });
    }
}
