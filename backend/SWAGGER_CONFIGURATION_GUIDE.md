# Swagger/OpenAPI Configuration Guide
## Car Repair Service Management System - Final Graduation Project

This guide explains how Swagger is configured in your .NET Web API project.

---

## **STEP 1: Enable Swagger in Program.cs**

### 1.1 Install Required NuGet Package
```bash
dotnet add package Swashbuckle.AspNetCore
```

✅ **Already installed** in your project (version 6.5.0)

### 1.2 Enable XML Documentation
Update `CarRepairService.API.csproj`:

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn> <!-- Suppress XML comment warnings -->
</PropertyGroup>
```

✅ **Configured** - This generates XML file with your code comments

### 1.3 Register Swagger Services in Program.cs
```csharp
// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Configuration will be added in next steps
});
```

✅ **Enabled** - Base Swagger services are registered

---

## **STEP 2: Configure Swagger UI**

### 2.1 Basic Swagger Configuration
In `Program.cs`, configure Swagger document:

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Car Repair Service API",
        Version = "v1",
        Description = "A comprehensive RESTful API for managing car repair services",
        Contact = new OpenApiContact
        {
            Name = "Your Name/Team",
            Email = "support@carrepairservice.com",
            Url = new Uri("https://github.com/yourrepo")
        },
        License = new OpenApiLicense
        {
            Name = "MIT License",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });
});
```

### 2.2 Enhanced Swagger UI Settings
Configure UI middleware in the pipeline:

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Car Repair Service API V1");
        c.RoutePrefix = "swagger"; // Access at https://localhost:PORT/swagger
        
        // UI Enhancements
        c.DefaultModelsExpandDepth(2);     // Model expand depth
        c.DefaultModelRendering(ModelRendering.Model); // Show model by default
        c.DocExpansion(DocExpansion.None); // Don't expand endpoints by default
        c.EnableDeepLinking();             // Enable deep linking
        c.DisplayRequestDuration();        // Show request duration
        c.EnableFilter();                  // Enable filter box
        c.ShowExtensions();                // Show vendor extensions
        c.EnablePersistAuthorization();    // Remember authorization between page refreshes
        
        c.DocumentTitle = "Car Repair Service API Documentation";
    });
}
```

✅ **Configured** - Enhanced UI settings for better demo experience

### 2.3 Access Swagger UI
Run your application and navigate to:
```
https://localhost:5001/swagger
```
or
```
http://localhost:5000/swagger
```

---

## **STEP 3: Group Endpoints**

### 3.1 Using [Tags] Attribute
Add `[Tags]` attribute to controllers to group related endpoints:

```csharp
/// <summary>
/// Authentication and Authorization endpoints
/// </summary>
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[Tags("Authentication")]  // ← Groups all endpoints under "Authentication"
public class AuthController : ControllerBase
{
    // Your endpoints here
}
```

### 3.2 Example: Different Controller Groups
```csharp
[Tags("Authentication")]
public class AuthController : ControllerBase { }

[Tags("Appointments")]
public class AppointmentsController : ControllerBase { }

[Tags("Service Catalog")]
public class ServicesController : ControllerBase { }

[Tags("Customers")]
public class CustomersController : ControllerBase { }

[Tags("Vehicles")]
public class VehiclesController : ControllerBase { }
```

### 3.3 Configure Tag Sorting in Program.cs
```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.TagActionsBy(api =>
    {
        if (api.GroupName != null)
            return new[] { api.GroupName };
        
        var controllerName = api.ActionDescriptor.RouteValues["controller"];
        return new[] { controllerName ?? "Unknown" };
    });
    
    c.DocInclusionPredicate((name, api) => true);
    
    // Order actions by controller and HTTP method
    c.OrderActionsBy(apiDesc => 
        $"{apiDesc.ActionDescriptor.RouteValues["controller"]}_{apiDesc.HttpMethod}");
});
```

✅ **Configured** - Endpoints are now grouped by controller

---

## **STEP 4: Add API Documentation Descriptions**

### 4.1 XML Documentation Comments
Use XML comments above your controller actions:

```csharp
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
    // Implementation
}
```

### 4.2 Enable XML Comments in Swagger
```csharp
builder.Services.AddSwaggerGen(c =>
{
    // Include XML comments
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});
```

### 4.3 Response Type Documentation
Always specify response types:

```csharp
[ProducesResponseType(typeof(AppointmentResponseDto), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
```

✅ **Configured** - XML documentation is enabled and examples provided

---

## **STEP 5: Configure JWT Authentication in Swagger**

### 5.1 Add Security Definition
Configure JWT security scheme in `Program.cs`:

```csharp
builder.Services.AddSwaggerGen(c =>
{
    // ... other configurations ...
    
    // JWT Authentication Configuration
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme. 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});
```

### 5.2 What This Does:
- Adds a 🔒 lock icon to protected endpoints
- Shows an **"Authorize"** button at the top of Swagger UI
- Automatically includes Bearer token in requests

✅ **Configured** - JWT authentication is enabled in Swagger

---

## **STEP 6: Test Protected Endpoints in Swagger**

### 6.1 Testing Flow

#### **Step 1: Register or Login**
1. Open Swagger UI: `https://localhost:5001/swagger`
2. Find the **"Authentication"** group
3. Expand `POST /api/v1/Auth/login`
4. Click **"Try it out"**
5. Enter test credentials:
   ```json
   {
     "email": "admin@carrepair.com",
     "password": "Admin123!"
   }
   ```
6. Click **"Execute"**
7. Copy the `accessToken` from the response

#### **Step 2: Authorize in Swagger**
1. Click the **"Authorize"** button 🔓 (top right)
2. In the popup, enter: `Bearer YOUR_ACCESS_TOKEN`
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI...
   ```
3. Click **"Authorize"**
4. Click **"Close"**
5. The lock icon 🔒 should now be closed

#### **Step 3: Test Protected Endpoint**
1. Find a protected endpoint (e.g., `GET /api/v1/Appointments`)
2. Click **"Try it out"**
3. Click **"Execute"**
4. The request will automatically include your JWT token
5. You should receive a `200 OK` response

### 6.2 Understanding Authorization States

| Icon | Meaning |
|------|---------|
| 🔓 | Not authorized - will fail with 401 |
| 🔒 | Authorized - token included in requests |

### 6.3 Endpoint Authorization Levels

```csharp
// No authorization required
[AllowAnonymous]
[HttpGet("public-data")]

// Any authenticated user
[Authorize]
[HttpGet("protected-data")]

// Specific role required
[Authorize(Roles = "Admin")]
[HttpGet("admin-only")]

// Multiple roles allowed
[Authorize(Roles = "Admin,Manager")]
[HttpGet("admin-or-manager")]
```

### 6.4 Testing Different Roles

To test different user roles:

1. **Login as Customer:**
   ```json
   { "email": "customer@example.com", "password": "Customer123!" }
   ```
   - Can access customer endpoints
   - Cannot access admin endpoints

2. **Login as Admin:**
   ```json
   { "email": "admin@carrepair.com", "password": "Admin123!" }
   ```
   - Can access all endpoints

3. **Expected Responses:**
   - `200 OK` - Success
   - `401 Unauthorized` - No token or invalid token
   - `403 Forbidden` - Valid token but insufficient permissions

### 6.5 Token Expiration Handling

When your token expires:
1. Use `POST /api/v1/Auth/refresh-token` with your refresh token
2. Get a new access token
3. Click **"Authorize"** again and enter the new token

---

## **Complete Program.cs Reference**

Here's the complete Swagger configuration section:

```csharp
// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // API Information
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Car Repair Service API",
        Version = "v1",
        Description = "Complete API documentation",
        Contact = new OpenApiContact { Name = "Support", Email = "support@example.com" }
    });

    // XML Documentation
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }

    // JWT Authentication
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new List<string>()
        }
    });

    // Grouping and Ordering
    c.TagActionsBy(api => new[] { api.ActionDescriptor.RouteValues["controller"] ?? "Unknown" });
    c.DocInclusionPredicate((name, api) => true);
    c.OrderActionsBy(apiDesc => $"{apiDesc.ActionDescriptor.RouteValues["controller"]}");
});

// ... rest of configuration ...

// Middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Car Repair Service API V1");
        c.RoutePrefix = "swagger";
        c.EnableDeepLinking();
        c.DisplayRequestDuration();
        c.EnableFilter();
        c.EnablePersistAuthorization();
        c.DocumentTitle = "Car Repair Service API Documentation";
    });
}
```

---

## **Demo Presentation Tips**

### For Your Graduation Project Demo:

1. **Start with Swagger Overview:**
   - Show the clean, organized UI
   - Point out the grouped endpoints
   - Highlight the detailed documentation

2. **Demonstrate Authentication:**
   - Login to get a token
   - Show the Authorize button
   - Explain JWT security

3. **Test Public Endpoints:**
   - Show endpoints that don't require authentication
   - Example: `GET /api/v1/Services`

4. **Test Protected Endpoints:**
   - Show 401 error without authentication
   - Authorize with JWT token
   - Successfully access protected endpoint

5. **Show Role-Based Access:**
   - Login as different users (Customer, Admin)
   - Demonstrate that customers can't access admin endpoints

6. **Highlight Professional Features:**
   - XML documentation with examples
   - Response type documentation
   - Error handling (400, 401, 403, 404)
   - Request/Response models

---

## **Troubleshooting**

### Issue: Swagger page not loading
**Solution:** Ensure middleware order is correct:
```csharp
app.UseSwagger();
app.UseSwaggerUI();
// Must come before
app.UseAuthentication();
app.UseAuthorization();
```

### Issue: 401 Unauthorized even with token
**Solution:** Check token format:
- Must include "Bearer " prefix
- Token must not be expired
- Check JWT configuration matches

### Issue: XML comments not showing
**Solution:** 
- Verify `<GenerateDocumentationFile>true</GenerateDocumentationFile>` in .csproj
- Rebuild the project
- Check XML file exists in bin/Debug/net8.0/

---

## **Summary**

✅ **Step 1:** Swagger enabled with XML documentation  
✅ **Step 2:** Enhanced UI configuration for professional demo  
✅ **Step 3:** Endpoints grouped by [Tags] attribute  
✅ **Step 4:** Comprehensive XML documentation with examples  
✅ **Step 5:** JWT authentication configured in Swagger UI  
✅ **Step 6:** Complete testing workflow documented  

**Your Swagger configuration is now ready for your graduation project demo!** 🎓

---

**Author:** Senior .NET Backend Developer  
**Date:** March 3, 2026  
**Project:** Car Repair Service Management System
