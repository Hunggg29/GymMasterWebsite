using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models
{
    public class Trainer
    {
        public int TrainerId { get; set; }

        [Required]
        public int UserId { get; set; }

        [StringLength(100)]
        public string? Specialty { get; set; }

        public int Experience { get; set; }

        public decimal PricePerHour { get; set; }

        // Navigation property
        public User User { get; set; }
        public ICollection<TrainningSession> TrainingSessions { get; set; }
    }
} 