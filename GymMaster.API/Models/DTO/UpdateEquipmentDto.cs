namespace GymMaster.API.Models.DTO
{
    public class UpdateEquipmentDto
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public DateTime ImportDate { get; set; }
        public DateTime Warranty { get; set; }
        public string Status { get; set; }
        public int? RoomId { get; set; }
    }
}
