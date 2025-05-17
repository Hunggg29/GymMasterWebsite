using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class SubscriptionDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int PlanId { get; set; }

        [Required]
        public int PaymentId { get; set; }

        public bool AutoRenew { get; set; } = false;

        public bool IsActive { get; set; } = true;

        [StringLength(50)]
        public string Status { get; set; } = "Active";
    }
}