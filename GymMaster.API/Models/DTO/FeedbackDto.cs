using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class FeedbackDto
    {
        public int Id { get; set; }

        public string UserName {  get; set; }

        public string Message { get; set; }

        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
