using CarRepairService.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace CarRepairService.Application.Services;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger)
    {
        _logger = logger;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        // TODO: Implement actual email sending (SendGrid, SMTP, etc.)
        _logger.LogInformation($"Email sent to {to}: {subject}");
        await Task.CompletedTask;
    }

    public async Task SendAppointmentConfirmationAsync(string to, string customerName, DateTime appointmentDate)
    {
        var subject = "Appointment Confirmation - Car Repair Service";
        var body = $"Dear {customerName},\n\nYour appointment has been confirmed for {appointmentDate:f}.\n\nThank you!";
        await SendEmailAsync(to, subject, body);
    }

    public async Task SendPasswordResetEmailAsync(string to, string resetLink)
    {
        var subject = "Password Reset Request";
        var body = $"Click the following link to reset your password: {resetLink}";
        await SendEmailAsync(to, subject, body);
    }
}
