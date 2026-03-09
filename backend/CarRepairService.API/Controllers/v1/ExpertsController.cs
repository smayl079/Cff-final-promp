using System;
using System.Threading.Tasks;
using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairService.API.Controllers.v1;

[ApiController]
[Route("api/v1/[controller]")]
public class ExpertsController : ControllerBase
{
    private readonly IExpertService _expertService;

    public ExpertsController(IExpertService expertService)
    {
        _expertService = expertService;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var response = await _expertService.GetAllExpertsAsync();
        return Ok(new { data = response });
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(Guid id)
    {
        var response = await _expertService.GetExpertByIdAsync(id);
        if (response == null)
            return NotFound();
            
        return Ok(response);
    }

    [HttpPost]
    [AllowAnonymous] // Changed to AllowAnonymous temporarily to ease UI testing
    public async Task<IActionResult> Create([FromBody] CreateExpertDto dto)
    {
        var response = await _expertService.CreateExpertAsync(dto);
        return Ok(response);
    }

    [HttpPut("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateExpertDto dto)
    {
        var response = await _expertService.UpdateExpertAsync(id, dto);
        if (response == null)
            return NotFound();
            
        return Ok(response);
    }

    [HttpDelete("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> Delete(Guid id)
    {
        var success = await _expertService.DeleteExpertAsync(id);
        if (!success)
            return NotFound();
            
        return Ok(new { message = "Deleted successfully" });
    }
}