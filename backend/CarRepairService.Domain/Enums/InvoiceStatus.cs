namespace CarRepairService.Domain.Enums;

public enum InvoiceStatus
{
    Pending = 0,
    Paid = 1,
    PartiallyPaid = 2,
    Overdue = 3,
    Cancelled = 4
}
