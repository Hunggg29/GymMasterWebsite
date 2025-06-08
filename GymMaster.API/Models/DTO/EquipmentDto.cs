namespace GymMaster.API.Models.DTO
{
    public class EquipmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public DateTime ImportDate { get; set; }
        public DateTime Warranty { get; set; }
        public string Status { get; set; }

        public int RoomId {  get; set; }

        public string RoomName { get; set; }
    }
}
