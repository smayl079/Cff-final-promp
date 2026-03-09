using CarRepairService.Domain.Entities;
using CarRepairService.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRepairService.Infrastructure.Data
{
    public static class DatabaseSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            await context.Database.EnsureCreatedAsync();

            // Seed Settings
            if (!await context.CompanySettings.AnyAsync())
            {
                context.CompanySettings.Add(new CompanySettings
                {
                    CompanyName = "AutoCare Experts",
                    ContactEmail = "support@autocare.com",
                    ContactPhone = "+1 800 123 4567",
                    Address = "123 Auto Avenue, Car City, NY 10001",
                    WorkingHours = "Mon-Sat: 8AM - 6PM",
                    FacebookUrl = "https://facebook.com/autocare",
                    InstagramUrl = "https://instagram.com/autocare",
                    TwitterUrl = ""
                });
            }

            // Seed Messages
            if (!await context.ContactMessages.AnyAsync())
            {
                context.ContactMessages.AddRange(new List<ContactMessage>
                {
                    new ContactMessage { Name = "John Smith", Email = "john@example.com", Phone = "", Subject = "Engine Noise", Message = "My car makes a weird noise when I start it.", IsRead = false, CreatedAt = DateTime.UtcNow.AddDays(-1) },
                    new ContactMessage { Name = "Mary Cole", Email = "mary@example.com", Phone = "", Subject = "Pricing inquiry", Message = "How much for a standard oil change?", IsRead = true, CreatedAt = DateTime.UtcNow.AddDays(-2) }
                });
            }

            // Seed Categories
            Guid categoryId1 = Guid.NewGuid();
            Guid categoryId2 = Guid.NewGuid();
            if (!await context.ServiceCategories.AnyAsync())
            {
                context.ServiceCategories.AddRange(new List<ServiceCategory>
                {
                    new ServiceCategory { Id = categoryId1, Name = "Maintenance", Description = "Routine maintenance tasks", DisplayOrder = 1 },
                    new ServiceCategory { Id = categoryId2, Name = "Repairs", Description = "Fixing broken parts", DisplayOrder = 2 }
                });
            }
            else
            {
                categoryId1 = await context.ServiceCategories.Select(c => c.Id).FirstOrDefaultAsync();
                categoryId2 = categoryId1;
            }

            // Seed Services
            if (!await context.Services.AnyAsync())
            {
                context.Services.AddRange(new List<Service>
                {
                    new Service { Name = "Full Synthetic Oil Change", Description = "Premium oil change with filter replacement.", CategoryId = categoryId1, Price = 89.99m, EstimatedMinutes = 45, IsActive = true },
                    new Service { Name = "Brake Pad Replacement", Description = "Replace front or rear brake pads.", CategoryId = categoryId2, Price = 150.00m, EstimatedMinutes = 120, IsActive = true },
                    new Service { Name = "Tire Rotation", Description = "Rotate all 4 tires for even wear.", CategoryId = categoryId1, Price = 35.00m, EstimatedMinutes = 30, IsActive = true },
                    new Service { Name = "Diagnostics", Description = "Computer diagnostics to find engine issues.", CategoryId = categoryId2, Price = 100.00m, EstimatedMinutes = 60, IsActive = true }
                });
            }

            // Seed Users (Mechanics & Customers)
            if (!await context.Users.AnyAsync(u => u.Role == UserRole.Mechanic))
            {
                var mechanicUser1 = new User { Id = Guid.NewGuid(), Email = "mike.mechanic@example.com", FirstName = "Mike", LastName = "Wrench", Role = UserRole.Mechanic, IsActive = true };
                var mechanicUser2 = new User { Id = Guid.NewGuid(), Email = "sarah.tools@example.com", FirstName = "Sarah", LastName = "Tools", Role = UserRole.Mechanic, IsActive = true };
                
                context.Users.AddRange(mechanicUser1, mechanicUser2);

                context.Mechanics.AddRange(
                    new Mechanic { Id = Guid.NewGuid(), UserId = mechanicUser1.Id, FirstName = "Mike", LastName = "Wrench", HourlyRate = 45.0m, HireDate = DateTime.UtcNow.AddYears(-2), Specializations = "Engines", IsActive = true },
                    new Mechanic { Id = Guid.NewGuid(), UserId = mechanicUser2.Id, FirstName = "Sarah", LastName = "Tools", HourlyRate = 50.0m, HireDate = DateTime.UtcNow.AddYears(-1), Specializations = "Brakes, Tires", IsActive = true }
                );
            }

            if (!await context.Users.AnyAsync(u => u.Role == UserRole.Customer))
            {
                var customerUser1 = new User { Id = Guid.NewGuid(), Email = "alice.buyer@example.com", FirstName = "Alice", LastName = "Buyer", Role = UserRole.Customer, IsActive = true };
                var customerUser2 = new User { Id = Guid.NewGuid(), Email = "bob.driver@example.com", FirstName = "Bob", LastName = "Driver", Role = UserRole.Customer, IsActive = true };

                context.Users.AddRange(customerUser1, customerUser2);

                var customer1 = new Customer { Id = Guid.NewGuid(), Email = customerUser1.Email, FirstName = "Alice", LastName = "Buyer" };
                var customer2 = new Customer { Id = Guid.NewGuid(), Email = customerUser2.Email, FirstName = "Bob", LastName = "Driver" };

                context.Customers.AddRange(customer1, customer2);

                // Seed Vehicles
                var vehicle1 = new Vehicle { Id = Guid.NewGuid(), CustomerId = customer1.Id, Make = "Toyota", Model = "Camry", Year = 2018, LicensePlate = "ABC-1234", VIN = "1HG123456789", Color = "Silver", Mileage = 65000 };
                var vehicle2 = new Vehicle { Id = Guid.NewGuid(), CustomerId = customer2.Id, Make = "Ford", Model = "F-150", Year = 2020, LicensePlate = "XYZ-9876", VIN = "1FT123456789", Color = "Blue", Mileage = 45000 };

                context.Vehicles.AddRange(vehicle1, vehicle2);

                // Seed Appointments
                if (!await context.Appointments.AnyAsync())
                {
                    var mechanic = await context.Mechanics.FirstOrDefaultAsync();

                    context.Appointments.AddRange(
                        new Appointment { Id = Guid.NewGuid(), CustomerId = customer1.Id, VehicleId = vehicle1.Id, MechanicId = mechanic?.Id, ScheduledDate = DateTime.UtcNow.AddDays(1), Status = AppointmentStatus.Confirmed, TotalAmount = 89.99m, Notes = "Just an oil change" },
                        new Appointment { Id = Guid.NewGuid(), CustomerId = customer2.Id, VehicleId = vehicle2.Id, MechanicId = mechanic?.Id, ScheduledDate = DateTime.UtcNow.AddDays(2), Status = AppointmentStatus.Pending, TotalAmount = 150.00m, Notes = "Brakes making noise" },
                        new Appointment { Id = Guid.NewGuid(), CustomerId = customer1.Id, VehicleId = vehicle1.Id, ScheduledDate = DateTime.UtcNow.AddDays(-5), Status = AppointmentStatus.Completed, TotalAmount = 100.00m, Notes = "Check engine light was on" }
                    );
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
