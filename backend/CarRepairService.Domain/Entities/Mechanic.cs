using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

public class Mechanic : BaseEntity
{
    public Guid UserId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Specializations { get; set; }
    public string? Certifications { get; set; }
    public DateTime HireDate { get; set; }
    public decimal HourlyRate { get; set; }
    public bool IsActive { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
