using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface IGymRoomService
    {
        Task<IEnumerable<GymRoom>> GetAllGymRoomAsync();

        Task<GymRoom?> GetGymRoomByIdAsync(int id);

        Task<GymRoom> CreateGymRoomAsync(GymRoom room);

        Task<GymRoom?> UpdateGymRoomAsync(int id, GymRoom room);

        Task<GymRoom?> DeleteGymRoomAsync(int id);

        Task<IEnumerable<Equipment>> GetEquipmentByRoomIdAsync(int roomId);
    }
}
