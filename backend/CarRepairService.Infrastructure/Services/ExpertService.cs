using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.DTOs.Responses;
using CarRepairService.Application.Interfaces;
using CarRepairService.Domain.Entities;
using CarRepairService.Infrastructure.Data;

namespace CarRepairService.Infrastructure.Services;

public class ExpertService : IExpertService
{
    private readonly ApplicationDbContext _context;

    public ExpertService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ExpertDto>> GetAllExpertsAsync()
    {
        var experts = await _context.Experts
            .OrderBy(e => e.CreatedAt)
            .ToListAsync();

        return experts.Select(MapToDto).ToList();
    }

    public async Task<ExpertDto?> GetExpertByIdAsync(Guid id)
    {
        var expert = await _context.Experts.FindAsync(id);
        if (expert == null) return null;

        return MapToDto(expert);
    }

    public async Task<ExpertDto> CreateExpertAsync(CreateExpertDto dto)
    {
        var expert = new Expert
        {
            Name = dto.Name,
            Role = dto.Role,
            Experience = dto.Experience,
            ImageUrl = dto.ImageUrl,
            IsDeleted = false
        };

        _context.Experts.Add(expert);
        await _context.SaveChangesAsync();

        return MapToDto(expert);
    }

    public async Task<ExpertDto?> UpdateExpertAsync(Guid id, UpdateExpertDto dto)
    {
        var expert = await _context.Experts.FindAsync(id);
        if (expert == null) return null;

        expert.Name = dto.Name;
        expert.Role = dto.Role;
        expert.Experience = dto.Experience;
        
        if (dto.ImageUrl != null)
        {
            expert.ImageUrl = dto.ImageUrl;
        }

        _context.Experts.Update(expert);
        await _context.SaveChangesAsync();

        return MapToDto(expert);
    }

    public async Task<bool> DeleteExpertAsync(Guid id)
    {
        var expert = await _context.Experts.FindAsync(id);
        if (expert == null) return false;

        expert.IsDeleted = true;
        
        _context.Experts.Update(expert);
        await _context.SaveChangesAsync();

        return true;
    }

    private static ExpertDto MapToDto(Expert expert)
    {
        return new ExpertDto
        {
            Id = expert.Id,
            Name = expert.Name,
            Role = expert.Role,
            Experience = expert.Experience,
            ImageUrl = expert.ImageUrl,
            CreatedAt = expert.CreatedAt,
            UpdatedAt = expert.UpdatedAt
        };
    }
}