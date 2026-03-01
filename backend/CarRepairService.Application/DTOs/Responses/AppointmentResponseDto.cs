namespace CarRepairService.Application.DTOs.Responses;

public class AppointmentResponseDto
{
    public Guid Id { get; set; }
    public DateTime ScheduledDate { get; set; }
    public int Duration { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string? Notes { get; set; }
    public string? MechanicNotes { get; set; }
    
    public CustomerSummaryDto Customer { get; set; } = null!;
    public VehicleSummaryDto Vehicle { get; set; } = null!;
    public MechanicSummaryDto? Mechanic { get; set; }
    public List<ServiceSummaryDto> Services { get; set; } = new();
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CustomerSummaryDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}

public class VehicleSummaryDto
{
    public Guid Id { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
}

public class MechanicSummaryDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = string.Empty;
}

public class ServiceSummaryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int EstimatedMinutes { get; set; }
}
