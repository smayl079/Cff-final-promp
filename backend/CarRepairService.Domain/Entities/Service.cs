using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Guid CategoryId { get; set; }
    public decimal Price { get; set; }
    public decimal? PriceMax { get; set; }
    public int EstimatedMinutes { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public string? ImageUrl { get; set; }

    // Navigation properties
    public ServiceCategory Category { get; set; } = null!;
    public ICollection<AppointmentService> AppointmentServices { get; set; } = new List<AppointmentService>();
}
