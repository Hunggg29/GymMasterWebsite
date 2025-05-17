using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymMaster.API.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int PlanId { get; set; }
        
        [Required]
        public DateTime StartDate { get; set; }
        
        [Required]
        public DateTime EndDate { get; set; }
        
        public bool IsActive { get; set; } = true;

        [StringLength(50)]
        public string Status { get; set; } = "Active";
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? CancelledAt { get; set; }

        [StringLength(500)]
        public string? CancellationReason { get; set; }

        [Required]
        public int PaymentId { get; set; }
        
        [ForeignKey("UserId")]
        public User User { get; set; }
        
        [ForeignKey("PlanId")]
        public Plan Plan { get; set; }

        [ForeignKey("PaymentId")]
        public Payment Payment { get; set; }

        public bool AutoRenew { get; set; } = false;
    }
} 