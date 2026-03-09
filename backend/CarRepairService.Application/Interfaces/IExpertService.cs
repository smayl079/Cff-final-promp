using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.DTOs.Responses;

namespace CarRepairService.Application.Interfaces;

public interface IExpertService
{
    Task<List<ExpertDto>> GetAllExpertsAsync();
    Task<ExpertDto?> GetExpertByIdAsync(Guid id);
    Task<ExpertDto> CreateExpertAsync(CreateExpertDto dto);
    Task<ExpertDto?> UpdateExpertAsync(Guid id, UpdateExpertDto dto);
    Task<bool> DeleteExpertAsync(Guid id);
}