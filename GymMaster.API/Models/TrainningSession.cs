using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymMaster.API.Models
{
    public class TrainningSession
    {
        public int Id { get; set; }

        [Required]
        public int TrainerId { get; set; }

        [Required]
        public int RoomId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? SessionType { get; set; }

        [ForeignKey("TrainerId")]
        public User Trainer { get; set; }

        [ForeignKey("RoomId")]
        public GymRoom GymRoom { get; set; }

        public ICollection<TrainingHistory> TrainingHistories { get; set; }
    }
}
