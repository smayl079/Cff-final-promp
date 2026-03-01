using CarRepairService.Domain.Common;
using CarRepairService.Domain.Enums;

namespace CarRepairService.Domain.Entities;

public class Invoice : BaseEntity
{
    public Guid AppointmentId { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public DateTime InvoiceDate { get; set; }
    public DateTime? DueDate { get; set; }
    public decimal SubTotal { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal AmountPaid { get; set; }
    public InvoiceStatus Status { get; set; }
    public string? Notes { get; set; }

    // Navigation properties
    public Appointment Appointment { get; set; } = null!;
    public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();
}
