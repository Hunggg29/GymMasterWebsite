namespace GymMaster.API.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendEquipmentMaintenanceEmailAsync(string equipmentName, string equipmentId);
    }
} 