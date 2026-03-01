using CarRepairService.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarRepairService.Infrastructure.Configurations;

public class ServiceConfiguration : IEntityTypeConfiguration<Service>
{
    public void Configure(EntityTypeBuilder<Service> builder)
    {
        builder.ToTable("Services");

        builder.HasKey(s => s.Id);

        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(s => s.Description)
            .HasMaxLength(500);

        builder.Property(s => s.Price)
            .HasColumnType("decimal(18,2)");

        builder.Property(s => s.PriceMax)
            .HasColumnType("decimal(18,2)");

        // Indexes
        builder.HasIndex(s => s.Name);
        builder.HasIndex(s => s.IsActive);

        // Relationships
        builder.HasOne(s => s.Category)
            .WithMany(c => c.Services)
            .HasForeignKey(s => s.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(s => s.AppointmentServices)
            .WithOne(aps => aps.Service)
            .HasForeignKey(aps => aps.ServiceId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
