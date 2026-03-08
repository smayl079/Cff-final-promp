using CarRepairService.Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace CarRepairService.Domain.Entities
{
    public class CompanySettings : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string CompanyName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string ContactEmail { get; set; }

        [Required]
        [MaxLength(50)]
        public string ContactPhone { get; set; }

        [MaxLength(500)]
        public string Address { get; set; }

        [MaxLength(200)]
        public string FacebookUrl { get; set; }

        [MaxLength(200)]
        public string TwitterUrl { get; set; }

        [MaxLength(200)]
        public string InstagramUrl { get; set; }

        [MaxLength(500)]
        public string WorkingHours { get; set; }
    }
}
