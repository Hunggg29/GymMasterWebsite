using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class CreateUserByAdminDto
    {
        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [StringLength(10)]
        public string? Phone { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; }

        [Required]
        public DateTime Birthday { get; set; }

        [StringLength(100)]
        public string? FullName { get; set; }

        // Trainer specific fields
        public string? Specialty { get; set; }
        public int? Experience { get; set; }
        public decimal? PricePerHour { get; set; }
    }
} 