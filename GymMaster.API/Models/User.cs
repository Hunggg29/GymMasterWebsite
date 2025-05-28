using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymMaster.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

   
        [StringLength(10)]
        public string? Phone { get;set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime Birthday { get; set; }

        [StringLength(100)]
        public string? FullName { get; set; }
        public int? TrainerId { get; set; }

        [ForeignKey("TrainerId")]
        public Trainer Trainer { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; }
        public ICollection<Subscription> Subscriptions { get; set; }
        public ICollection<Payment> Payments { get; set; }
        public ICollection<TrainningSession> TrainingSessions { get; set; }

    }
} 