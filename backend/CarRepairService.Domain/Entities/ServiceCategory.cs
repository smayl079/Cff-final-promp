using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

public class ServiceCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }

    // Navigation properties
    public ICollection<Service> Services { get; set; } = new List<Service>();
}
