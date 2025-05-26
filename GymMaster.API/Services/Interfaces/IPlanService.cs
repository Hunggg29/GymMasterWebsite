using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface IPlanService
    {
        Task<IEnumerable<Plan>> GetAllPlansAsync();
        Task<Plan> GetPlanByIdAsync(int id);
        Task<Plan> CreatePlanAsync(Plan plan);
        Task<Plan?> UpdatePlanAsync(int id, Plan plan);
        Task<bool> DeletePlanAsync(int id);
        Task<bool> TogglePlanStatusAsync(int id);
    }
} 