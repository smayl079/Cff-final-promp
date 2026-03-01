using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

public class Vehicle : BaseEntity
{
    public Guid CustomerId { get; set; }
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public string VIN { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public string? Color { get; set; }
    public int? Mileage { get; set; }

    // Navigation properties
    public Customer Customer { get; set; } = null!;
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
