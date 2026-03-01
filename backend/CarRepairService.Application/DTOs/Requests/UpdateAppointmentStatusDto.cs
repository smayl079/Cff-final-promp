using CarRepairService.Domain.Enums;

namespace CarRepairService.Application.DTOs.Requests;

public class UpdateAppointmentStatusDto
{
    public AppointmentStatus Status { get; set; }
}
