using System.ComponentModel.DataAnnotations;

namespace CarRepairService.Application.DTOs.Requests;

public class CreateAppointmentDto
{
    [Required]
    public Guid CustomerId { get; set; }

    [Required]
    public Guid VehicleId { get; set; }

    [Required]
    [MinLength(1, ErrorMessage = "At least one service must be selected")]
    public List<Guid> ServiceIds { get; set; } = new();

    [Required]
    public DateTime ScheduledDate { get; set; }

    public string? Notes { get; set; }

    public Guid? PreferredMechanicId { get; set; }
}
