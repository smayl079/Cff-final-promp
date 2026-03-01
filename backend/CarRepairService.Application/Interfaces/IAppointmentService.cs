using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.DTOs.Responses;

namespace CarRepairService.Application.Interfaces;

public interface IAppointmentService
{
    Task<AppointmentResponseDto> GetByIdAsync(Guid id);
    Task<IEnumerable<AppointmentResponseDto>> GetAllAsync(int pageNumber, int pageSize);
    Task<IEnumerable<AppointmentResponseDto>> GetByCustomerIdAsync(Guid customerId);
    Task<AppointmentResponseDto> CreateAsync(CreateAppointmentDto createDto);
    Task<AppointmentResponseDto?> UpdateAsync(Guid id, UpdateAppointmentDto updateDto);
    Task<bool> UpdateStatusAsync(Guid id, Domain.Enums.AppointmentStatus status);
    Task<bool> CancelAsync(Guid id);
}
