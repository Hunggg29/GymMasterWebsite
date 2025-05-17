using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models
{
    public class TrainingHistory
    {   
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int SessionId { get; set; }
        public string AttendanceStatus { get; set; }
        public string Notes { get; set; }

        public User User { get; set; }
        public TrainningSession TrainningSession { get; set; }
    }
}
