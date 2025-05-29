using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class TrainingSessionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TrainerId { get; set; }
        public int RoomId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? SessionType { get; set; }
        public bool AttendanceStatus { get; set; }
        public string? Notes { get; set; }

        // Basic user info
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }

        // Basic trainer info
        public string? TrainerName { get; set; }
        public string? TrainerSpecialty { get; set; }

        // Basic room info
        public string? RoomName { get; set; }
        public string? RoomType { get; set; }
    }
} 