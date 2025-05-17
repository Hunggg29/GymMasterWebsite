using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.DTO
{
    public class CreateSubscriptionDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int PlanId { get; set; }

        [Required]
        public int PaymentId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; } = true;

        [StringLength(50)]
        public string Status { get; set; } = "Active";

        public bool AutoRenew { get; set; } = false;
    }
}