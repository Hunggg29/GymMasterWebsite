using GymMaster.API.Models.DTO;

namespace GymMaster.API.Services.Interfaces
{
    public interface IAdminService
    {
        Task<IEnumerable<MonthlyRevenueDto>> GetMonthlyRevenueAsync();
    }
}
