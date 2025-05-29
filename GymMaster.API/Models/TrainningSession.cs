using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymMaster.API.Models
{
    public class TrainningSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        public int TrainerId { get; set; }

        [Required]
        public int RoomId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? SessionType { get; set; }

        // Attendance fields from TrainingHistory
        public string? AttendanceStatus { get; set; }
        public string? Notes { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("TrainerId")]
        public Trainer Trainer { get; set; }

        [ForeignKey("RoomId")]
        public GymRoom GymRoom { get; set; }
    }
}
