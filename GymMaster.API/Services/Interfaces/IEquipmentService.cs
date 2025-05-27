using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface IEquipmentService
    {
        Task<IEnumerable<Equipment>> GetAllEquipmentAsync();

        Task<Equipment?> GetEquipmentByIdAsync(int id);
        Task<Equipment> CreateEquipmentAsync(Equipment equipment);
        Task<Equipment?> UpdateEquipmentAsync(int id, Equipment equipment); 

        Task<Equipment?> DeleteEquipmentAsync(int id);
    }
}
