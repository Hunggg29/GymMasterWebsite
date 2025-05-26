using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class CreateGymRoomDto
    {
        [Required]
        public string RoomName { get; set; }
        [Required]
        public string RoomType { get; set; }
        [Required]
        public int RoomQuantity { get; set; }
        [Required]
        public string RoomStatus { get; set; }
    }
}
