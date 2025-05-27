using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class CreateEquipmentDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public DateTime ImportDate { get; set; }
        public DateTime Warranty { get; set; }
        public string Status { get; set; }
        public int? RoomId { get; set; }
    }
}
