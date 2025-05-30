using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class ToggleAutoRenewDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public bool AutoRenew { get; set; }
    }
} 