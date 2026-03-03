using CarRepairService.Application.DTOs.Requests;
using CarRepairService.Application.DTOs.Responses;
using CarRepairService.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRepairService.API.Controllers.v1;

/// <summary>
/// Authentication and Authorization endpoints
/// </summary>
/// <remarks>
/// Handles user registration, login, token refresh, and password management
/// </remarks>
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
[Produces("application/json")]
[Tags("Authentication")] // STEP 3: Group endpoints
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Register a new customer account
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// 
    ///     POST /api/v1/Auth/register
    ///     {
    ///        "email": "customer@example.com",
    ///        "password": "StrongPass123!",
    ///        "confirmPassword": "StrongPass123!",
    ///        "firstName": "John",
    ///        "lastName": "Doe",
    ///        "phoneNumber": "+1234567890"
    ///     }
    /// 
    /// </remarks>
    /// <param name="registerDto">Registration details</param>
    /// <returns>Returns JWT token and user information</returns>
    /// <response code="201">Successfully registered and returned auth token</response>
    /// <response code="400">Invalid input or email already exists</response>
    [HttpPost("register")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        _logger.LogInformation("User registration attempt for email: {Email}", registerDto.Email);
        
        var result = await _authService.RegisterAsync(registerDto);
        
        if (!result.Success)
            return BadRequest(result);

        return CreatedAtAction(nameof(Register), result);
    }

    /// <summary>
    /// Login with email and password
    /// </summary>
    /// <remarks>
    /// Sample request:
    /// 
    ///     POST /api/v1/Auth/login
    ///     {
    ///        "email": "customer@example.com",
    ///        "password": "StrongPass123!"
    ///     }
    ///     
    /// Returns a JWT token that should be used in the Authorization header for protected endpoints
    /// </remarks>
    /// <param name="loginDto">Login credentials</param>
    /// <returns>Returns JWT access token, refresh token, and user information</returns>
    /// <response code="200">Successfully authenticated</response>
    /// <response code="401">Invalid credentials</response>
    [HttpPost("login")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        _logger.LogInformation("User login attempt for email: {Email}", loginDto.Email);
        
        var result = await _authService.LoginAsync(loginDto);
        
        if (!result.Success)
            return Unauthorized(result);

        return Ok(result);
    }

    /// <summary>
    /// Refresh access token using refresh token
    /// </summary>
    [HttpPost("refresh-token")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        var result = await _authService.RefreshTokenAsync(refreshTokenDto.RefreshToken);
        
        if (!result.Success)
            return Unauthorized(result);

        return Ok(result);
    }

    /// <summary>
    /// Logout and revoke refresh token
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Logout([FromBody] RefreshTokenDto refreshTokenDto)
    {
        var result = await _authService.RevokeTokenAsync(refreshTokenDto.RefreshToken);
        return Ok(result);
    }

    /// <summary>
    /// Change password for authenticated user
    /// </summary>
    [HttpPost("change-password")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
    {
        var userId = User.FindFirst("sub")?.Value;
        
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var result = await _authService.ChangePasswordAsync(Guid.Parse(userId), changePasswordDto);
        
        if (!result.Success)
            return BadRequest(result);

        return Ok(result);
    }

    /// <summary>
    /// Request password reset
    /// </summary>
    [HttpPost("forgot-password")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
    {
        var result = await _authService.ForgotPasswordAsync(forgotPasswordDto.Email);
        // Always return success to prevent email enumeration
        return Ok(new { message = "If the email exists, a password reset link has been sent." });
    }
}
