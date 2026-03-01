using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

public class Review : BaseEntity
{
    public Guid CustomerId { get; set; }
    public Guid AppointmentId { get; set; }
    public int Rating { get; set; } // 1-5 stars
    public string? Comment { get; set; }
    public bool IsApproved { get; set; }
    public DateTime? ApprovedAt { get; set; }

    // Navigation properties
    public Customer Customer { get; set; } = null!;
    public Appointment Appointment { get; set; } = null!;
}
