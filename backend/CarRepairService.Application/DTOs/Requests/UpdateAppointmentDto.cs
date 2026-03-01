namespace CarRepairService.Application.DTOs.Requests;

public class UpdateAppointmentDto
{
    public DateTime? ScheduledDate { get; set; }
    public Guid? MechanicId { get; set; }
    public string? Notes { get; set; }
    public string? MechanicNotes { get; set; }
}
