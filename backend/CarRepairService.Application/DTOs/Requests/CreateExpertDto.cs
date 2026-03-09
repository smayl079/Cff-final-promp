using System.ComponentModel.DataAnnotations;

namespace CarRepairService.Application.DTOs.Requests;

public class CreateExpertDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public string Role { get; set; } = string.Empty;
    
    [Required]
    public string Experience { get; set; } = string.Empty;
    
    public string? ImageUrl { get; set; }
}