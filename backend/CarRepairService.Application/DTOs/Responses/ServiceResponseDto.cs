namespace CarRepairService.Application.DTOs.Responses;

public class ServiceResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal? PriceMax { get; set; }
    public int EstimatedMinutes { get; set; }
    public bool IsActive { get; set; }
    public string? ImageUrl { get; set; }
    public ServiceCategoryDto? Category { get; set; }
}

public class ServiceCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
