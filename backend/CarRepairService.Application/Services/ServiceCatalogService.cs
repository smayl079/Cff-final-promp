using CarRepairService.Application.DTOs.Responses;
using CarRepairService.Application.Interfaces;

namespace CarRepairService.Application.Services;

public class ServiceCatalogService : IServiceCatalogService
{
    public async Task<IEnumerable<ServiceResponseDto>> GetAllAsync(bool activeOnly = true)
    {
        throw new NotImplementedException("Service implementation pending - requires domain and infrastructure layers");
    }

    public async Task<ServiceResponseDto?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException("Service implementation pending");
    }

    public async Task<IEnumerable<ServiceResponseDto>> GetByCategoryAsync(Guid categoryId)
    {
        throw new NotImplementedException("Service implementation pending");
    }
}
