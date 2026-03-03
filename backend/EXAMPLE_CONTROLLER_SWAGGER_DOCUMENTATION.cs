// ============================================================
// EXAMPLE: Complete Controller with Swagger Documentation
// ============================================================
// This example demonstrates all Swagger configuration features
// Use this as a template for documenting your controllers

using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.DTOs.Responses;
using CarRepairService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairService.API.Controllers.v1;

/// <summary>
/// Customer management endpoints
/// </summary>
/// <remarks>
/// Handles all customer-related operations including profile management,
/// vehicle registration, and appointment history
/// </remarks>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Authorize] // All endpoints require authentication by default
[Produces("application/json")] // All responses are JSON
[Tags("Customers")] // STEP 3: Group endpoints under "Customers" section
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;
    private readonly ILogger<CustomersController> _logger;

    public CustomersController(
        ICustomerService customerService,
        ILogger<CustomersController> logger)
    {
        _customerService = customerService;
        _logger = logger;
    }

    // ============================================================
    // EXAMPLE 1: Public Endpoint (No Authentication)
    // ============================================================

    /// <summary>
    /// Get total number of customers (Public statistics)
    /// </summary>
    /// <remarks>
    /// This is a public endpoint that doesn't require authentication.
    /// Returns basic statistics about registered customers.
    /// 
    /// **Note:** No authorization required - can be called without token
    /// </remarks>
    /// <returns>Total customer count</returns>
    /// <response code="200">Successfully retrieved customer count</response>
    [HttpGet("count")]
    [AllowAnonymous] // Override controller-level [Authorize]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCustomerCount()
    {
        _logger.LogInformation("Getting total customer count");
        var count = await _customerService.GetTotalCustomersAsync();
        return Ok(new { totalCustomers = count });
    }

    // ============================================================
    // EXAMPLE 2: Protected Endpoint (Authentication Required)
    // ============================================================

    /// <summary>
    /// Get current customer's profile
    /// </summary>
    /// <remarks>
    /// **Authentication Required** 🔒
    /// 
    /// Returns the profile information for the currently authenticated customer.
    /// The customer ID is extracted from the JWT token automatically.
    /// 
    /// **How to test:**
    /// 1. Login via /api/v1/Auth/login
    /// 2. Copy the accessToken from response
    /// 3. Click "Authorize" button at top
    /// 4. Enter: Bearer YOUR_ACCESS_TOKEN
    /// 5. Try this endpoint
    /// </remarks>
    /// <returns>Customer profile information</returns>
    /// <response code="200">Successfully retrieved customer profile</response>
    /// <response code="401">User not authenticated (missing or invalid token)</response>
    /// <response code="404">Customer profile not found</response>
    [HttpGet("profile")]
    [Authorize(Roles = "Customer")] // Only customers can access
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetMyProfile()
    {
        // Extract user ID from JWT token
        var userId = User.FindFirst("sub")?.Value;
        
        if (string.IsNullOrEmpty(userId))
        {
            _logger.LogWarning("UserId not found in token");
            return Unauthorized(new { message = "Invalid token - user ID not found" });
        }

        var customer = await _customerService.GetByIdAsync(Guid.Parse(userId));
        
        if (customer == null)
        {
            _logger.LogWarning("Customer not found for userId: {UserId}", userId);
            return NotFound(new { message = "Customer profile not found" });
        }

        return Ok(customer);
    }

    // ============================================================
    // EXAMPLE 3: POST Endpoint with Request Body
    // ============================================================

    /// <summary>
    /// Update customer profile
    /// </summary>
    /// <remarks>
    /// **Authentication Required** 🔒
    /// 
    /// Allows customers to update their profile information.
    /// 
    /// Sample request:
    /// 
    ///     PUT /api/v1/Customers/profile
    ///     {
    ///        "firstName": "John",
    ///        "lastName": "Doe",
    ///        "phoneNumber": "+1234567890",
    ///        "address": "123 Main St, City, State 12345"
    ///     }
    /// 
    /// **Validation Rules:**
    /// - firstName: Required, 2-50 characters
    /// - lastName: Required, 2-50 characters
    /// - phoneNumber: Valid phone format
    /// - address: Optional, max 200 characters
    /// </remarks>
    /// <param name="updateDto">Customer profile update data</param>
    /// <returns>Updated customer profile</returns>
    /// <response code="200">Profile successfully updated</response>
    /// <response code="400">Invalid input data (validation failed)</response>
    /// <response code="401">User not authenticated</response>
    /// <response code="404">Customer not found</response>
    [HttpPut("profile")]
    [Authorize(Roles = "Customer")]
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateCustomerDto updateDto)
    {
        var userId = User.FindFirst("sub")?.Value;
        
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        _logger.LogInformation("Updating profile for customer: {CustomerId}", userId);

        var result = await _customerService.UpdateAsync(Guid.Parse(userId), updateDto);
        
        if (!result.Success)
            return BadRequest(result);

        return Ok(result.Data);
    }

    // ============================================================
    // EXAMPLE 4: Admin-Only Endpoint (Role-Based Authorization)
    // ============================================================

    /// <summary>
    /// Get all customers (Admin only)
    /// </summary>
    /// <remarks>
    /// **Admin Authorization Required** 🔒👮
    /// 
    /// Retrieves a paginated list of all customers in the system.
    /// Only users with Admin role can access this endpoint.
    /// 
    /// **Testing different roles:**
    /// - ✅ Login as Admin → Works (200 OK)
    /// - ❌ Login as Customer → Forbidden (403)
    /// - ❌ No authentication → Unauthorized (401)
    /// 
    /// **Pagination:**
    /// - pageNumber: Which page to retrieve (default: 1)
    /// - pageSize: Items per page (default: 20, max: 100)
    /// </remarks>
    /// <param name="pageNumber">Page number to retrieve</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of customers</returns>
    /// <response code="200">Successfully retrieved customer list</response>
    /// <response code="401">Not authenticated</response>
    /// <response code="403">Authenticated but not authorized (not an admin)</response>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(PaginatedResponse<CustomerResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetAll(
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 20)
    {
        _logger.LogInformation("Admin fetching all customers. Page: {Page}, Size: {Size}", 
            pageNumber, pageSize);

        var customers = await _customerService.GetAllAsync(pageNumber, pageSize);
        return Ok(customers);
    }

    // ============================================================
    // EXAMPLE 5: Multiple Roles Allowed
    // ============================================================

    /// <summary>
    /// Get customer by ID
    /// </summary>
    /// <remarks>
    /// **Authorization Required** 🔒
    /// 
    /// Retrieves detailed information about a specific customer.
    /// 
    /// **Access Control:**
    /// - Admins can view any customer
    /// - Customers can only view their own profile
    /// 
    /// **Allowed roles:** Admin, Manager, Customer (own data only)
    /// </remarks>
    /// <param name="id">Customer unique identifier (GUID)</param>
    /// <returns>Customer details</returns>
    /// <response code="200">Successfully retrieved customer</response>
    /// <response code="401">Not authenticated</response>
    /// <response code="403">Not authorized to view this customer</response>
    /// <response code="404">Customer not found</response>
    [HttpGet("{id:guid}")]
    [Authorize(Roles = "Admin,Manager,Customer")]
    [ProducesResponseType(typeof(CustomerResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = User.FindFirst("sub")?.Value;
        var userRole = User.FindFirst("role")?.Value;

        // If customer, can only view own profile
        if (userRole == "Customer" && userId != id.ToString())
        {
            _logger.LogWarning("Customer {CustomerId} attempted to access another customer's data", userId);
            return Forbid();
        }

        var customer = await _customerService.GetByIdAsync(id);
        
        if (customer == null)
            return NotFound(new { message = $"Customer with ID {id} not found" });

        return Ok(customer);
    }

    // ============================================================
    // EXAMPLE 6: DELETE Endpoint
    // ============================================================

    /// <summary>
    /// Delete customer account (Admin only)
    /// </summary>
    /// <remarks>
    /// **Admin Authorization Required** 🔒👮
    /// 
    /// Permanently deletes a customer account and all associated data.
    /// 
    /// **⚠️ WARNING:** This action cannot be undone!
    /// 
    /// **What gets deleted:**
    /// - Customer profile
    /// - Associated vehicles
    /// - Appointment history
    /// - Review history
    /// 
    /// **Note:** Active appointments will be cancelled automatically
    /// </remarks>
    /// <param name="id">Customer ID to delete</param>
    /// <returns>Deletion confirmation</returns>
    /// <response code="204">Customer successfully deleted (No Content)</response>
    /// <response code="401">Not authenticated</response>
    /// <response code="403">Not authorized (not an admin)</response>
    /// <response code="404">Customer not found</response>
    /// <response code="409">Cannot delete - customer has active appointments</response>
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Delete(Guid id)
    {
        _logger.LogWarning("Admin deleting customer: {CustomerId}", id);

        var result = await _customerService.DeleteAsync(id);

        if (!result.Success)
        {
            if (result.Message.Contains("not found"))
                return NotFound(result);
            if (result.Message.Contains("active"))
                return Conflict(result);
            return BadRequest(result);
        }

        return NoContent();
    }

    // ============================================================
    // EXAMPLE 7: Search/Filter Endpoint
    // ============================================================

    /// <summary>
    /// Search customers by criteria (Admin only)
    /// </summary>
    /// <remarks>
    /// **Admin Authorization Required** 🔒👮
    /// 
    /// Performs advanced search across customer data.
    /// 
    /// **Search criteria (all optional):**
    /// - email: Partial email match
    /// - firstName: Partial first name match
    /// - lastName: Partial last name match
    /// - phoneNumber: Exact phone number match
    /// 
    /// **Example queries:**
    /// - /api/v1/Customers/search?email=gmail
    /// - /api/v1/Customers/search?firstName=John&amp;lastName=Doe
    /// - /api/v1/Customers/search?phoneNumber=+1234567890
    /// </remarks>
    /// <param name="email">Email to search for (partial match)</param>
    /// <param name="firstName">First name to search for (partial match)</param>
    /// <param name="lastName">Last name to search for (partial match)</param>
    /// <param name="phoneNumber">Phone number to search for (exact match)</param>
    /// <returns>List of matching customers</returns>
    /// <response code="200">Successfully retrieved matching customers</response>
    /// <response code="401">Not authenticated</response>
    /// <response code="403">Not authorized (not an admin)</response>
    [HttpGet("search")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(IEnumerable<CustomerResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> Search(
        [FromQuery] string? email = null,
        [FromQuery] string? firstName = null,
        [FromQuery] string? lastName = null,
        [FromQuery] string? phoneNumber = null)
    {
        _logger.LogInformation("Admin searching customers with filters: Email={Email}, FirstName={FirstName}", 
            email, firstName);

        var customers = await _customerService.SearchAsync(email, firstName, lastName, phoneNumber);
        return Ok(customers);
    }
}

// ============================================================
// KEY POINTS FOR SWAGGER DOCUMENTATION:
// ============================================================
// 
// 1. Controller-level attributes:
//    - [Tags("Name")] - Groups endpoints
//    - [Authorize] - Default auth for all endpoints
//    - [Produces("application/json")] - Content type
//
// 2. XML documentation:
//    - <summary> - Brief description (shown in list)
//    - <remarks> - Detailed description (shown when expanded)
//    - <param> - Parameter descriptions
//    - <returns> - Return value description
//    - <response code="XXX"> - HTTP status code descriptions
//
// 3. Action attributes:
//    - [AllowAnonymous] - Override controller-level auth
//    - [Authorize(Roles = "...")] - Role-based access
//    - [ProducesResponseType] - Document response types
//
// 4. Best practices:
//    - Always document all possible response codes
//    - Include example requests in <remarks>
//    - Use emojis sparingly (🔒 for auth, ⚠️ for warnings)
//    - Explain authorization requirements clearly
//    - Provide testing instructions
//
// ============================================================
