using CarRepairService.Domain.Common;
using CarRepairService.Domain.Enums;

namespace CarRepairService.Domain.Entities;

public class Appointment : BaseEntity
{
    public Guid CustomerId { get; set; }
    public Guid VehicleId { get; set; }
    public Guid? MechanicId { get; set; }
    public DateTime ScheduledDate { get; set; }
    public int Duration { get; set; } // in minutes
    public AppointmentStatus Status { get; set; }
    public string? Notes { get; set; }
    public string? MechanicNotes { get; set; }
    public decimal TotalAmount { get; set; }
    public int Priority { get; set; } // 0=Normal, 1=Urgent, 2=Emergency

    // Navigation properties
    public Customer Customer { get; set; } = null!;
    public Vehicle Vehicle { get; set; } = null!;
    public Mechanic? Mechanic { get; set; }
    public ICollection<AppointmentService> AppointmentServices { get; set; } = new List<AppointmentService>();
    public Invoice? Invoice { get; set; }
}
