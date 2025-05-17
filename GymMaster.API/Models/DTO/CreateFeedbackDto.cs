using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class CreateFeedbackDto
    {
        [Required]
        public string Message { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
    }
}
