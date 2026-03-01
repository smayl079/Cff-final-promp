using CarRepairService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarRepairService.Infrastructure.Configurations;

public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
{
    public void Configure(EntityTypeBuilder<Appointment> builder)
    {
        builder.ToTable("Appointments");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.TotalAmount)
            .HasColumnType("decimal(18,2)");

        builder.Property(a => a.Notes)
            .HasMaxLength(1000);

        builder.Property(a => a.MechanicNotes)
            .HasMaxLength(1000);

        // Indexes
        builder.HasIndex(a => a.ScheduledDate);
        builder.HasIndex(a => a.Status);
        builder.HasIndex(a => a.CustomerId);

        // Relationships
        builder.HasOne(a => a.Customer)
            .WithMany(c => c.Appointments)
            .HasForeignKey(a => a.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Vehicle)
            .WithMany(v => v.Appointments)
            .HasForeignKey(a => a.VehicleId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Mechanic)
            .WithMany(m => m.Appointments)
            .HasForeignKey(a => a.MechanicId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasMany(a => a.AppointmentServices)
            .WithOne(aps => aps.Appointment)
            .HasForeignKey(aps => aps.AppointmentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
