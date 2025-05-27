using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class UpdateTrainningSessionDto
    {
        [Required]
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
        public string AttendanceStatus { get; set; }
        public string Notes { get; set; }
    }
}
