using CarRepairService.Application.DTOs.Responses;
using CarRepairService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairService.API.Controllers.v1;

/// <summary>
/// Service catalog management
/// </summary>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Produces("application/json")]
[Tags("Service Catalog")] // STEP 3: Group endpoints
public class ServicesController : ControllerBase
{
    private readonly IServiceCatalogService _serviceCatalogService;
    private readonly ILogger<ServicesController> _logger;

    public ServicesController(
        IServiceCatalogService serviceCatalogService,
        ILogger<ServicesController> logger)
    {
        _serviceCatalogService = serviceCatalogService;
        _logger = logger;
    }

    /// <summary>
    /// Get all available services (Public endpoint)
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<ServiceResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] bool activeOnly = true)
    {
        _logger.LogInformation("Fetching all services");
        var services = await _serviceCatalogService.GetAllAsync(activeOnly);
        return Ok(services);
    }

    /// <summary>
    /// Get service by ID (Public endpoint)
    /// </summary>
    [HttpGet("{id}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ServiceResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var service = await _serviceCatalogService.GetByIdAsync(id);
        
        if (service == null)
            return NotFound(new { message = $"Service with ID {id} not found" });

        return Ok(service);
    }

    /// <summary>
    /// Get services by category (Public endpoint)
    /// </summary>
    [HttpGet("category/{categoryId}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(IEnumerable<ServiceResponseDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByCategory(Guid categoryId)
    {
        var services = await _serviceCatalogService.GetByCategoryAsync(categoryId);
        return Ok(services);
    }
}
