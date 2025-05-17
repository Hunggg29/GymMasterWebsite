using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymMaster.API.Models
{
    public class Payment
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentMethod { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Completed";

        public string? TransactionId { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        public Subscription Subscription { get; set; }
    }
}
