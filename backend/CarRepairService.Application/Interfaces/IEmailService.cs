namespace CarRepairService.Application.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string body);
    Task SendAppointmentConfirmationAsync(string to, string customerName, DateTime appointmentDate);
    Task SendPasswordResetEmailAsync(string to, string resetLink);
}
