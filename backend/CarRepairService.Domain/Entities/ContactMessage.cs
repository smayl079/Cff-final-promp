using CarRepairService.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace CarRepairService.Domain.Entities
{
    public class ContactMessage : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(50)]
        public string Phone { get; set; }

        [Required]
        [MaxLength(200)]
        public string Subject { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Message { get; set; }

        public bool IsRead { get; set; } = false;
    }
}
