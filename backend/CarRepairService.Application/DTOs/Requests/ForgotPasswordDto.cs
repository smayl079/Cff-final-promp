using System.ComponentModel.DataAnnotations;

namespace CarRepairService.Application.DTOs.Requests;

public class ForgotPasswordDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
