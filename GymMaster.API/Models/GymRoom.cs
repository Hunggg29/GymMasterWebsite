namespace GymMaster.API.Models
{
    public class GymRoom
    {   
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string RoomType { get; set; }
        public int RoomQuantity { get; set; }
        public string RoomStatus { get; set; }
        public ICollection<TrainningSession> TrainningSessions { get; set; }
        public ICollection<Equipment> Equipments { get; set; }
    }
}
