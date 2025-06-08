using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class UpdateTrainerDto
    {

        [StringLength(100)]
        public string? Specialty { get; set; }
        [Required]
        public int Experience { get; set; }
        [Required]
        public decimal PricePerHour { get; set; }
    }
}
