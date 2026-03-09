using CarRepairService.Domain.Common;

namespace CarRepairService.Domain.Entities;

public class Expert : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Experience { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
}