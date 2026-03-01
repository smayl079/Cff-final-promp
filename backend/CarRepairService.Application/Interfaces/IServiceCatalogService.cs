using CarRepairService.Application.DTOs.Responses;

namespace CarRepairService.Application.Interfaces;

public interface IServiceCatalogService
{
    Task<IEnumerable<ServiceResponseDto>> GetAllAsync(bool activeOnly = true);
    Task<ServiceResponseDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<ServiceResponseDto>> GetByCategoryAsync(Guid categoryId);
}
