using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class UpdateTrainingSessionDto
    {
        public string? SessionType { get; set; }

        public bool AttendanceStatus { get; set; }

        public string? Notes { get; set; }
    }
} 