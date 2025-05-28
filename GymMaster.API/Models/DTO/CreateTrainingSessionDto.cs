using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class CreateTrainingSessionDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int TrainerId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        public string? SessionType { get; set; }
    }
} 