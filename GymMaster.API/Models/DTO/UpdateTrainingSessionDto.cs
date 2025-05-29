using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class UpdateTrainingSessionDto
    {
        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        public string? SessionType { get; set; }

        public string? AttendanceStatus { get; set; }

        public string? Notes { get; set; }
    }
} 