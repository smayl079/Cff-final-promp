using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

/// <summary>
/// Junction table for many-to-many relationship between Appointment and Service
/// </summary>
public class AppointmentService : BaseEntity
{
    public Guid AppointmentId { get; set; }
    public Guid ServiceId { get; set; }
    public decimal Price { get; set; } // Price snapshot at booking time
    public int EstimatedMinutes { get; set; }

    // Navigation properties
    public Appointment Appointment { get; set; } = null!;
    public Service Service { get; set; } = null!;
}
