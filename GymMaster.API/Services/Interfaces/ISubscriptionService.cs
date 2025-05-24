using GymMaster.API.Models;
using GymMaster.API.Models.DTO;

namespace GymMaster.API.Services.Interfaces
{
    public interface ISubscriptionService
    {
        Task<IEnumerable<GetAllSubscriptionDto>> GetAllSubscriptionsAsync();
        Task<Subscription> GetSubscriptionByIdAsync(int id);
        Task<IEnumerable<Subscription>> GetUserSubscriptionsAsync(int userId);
        Task<Subscription> CreateSubscriptionAsync(Subscription subscription);
        Task<bool> UpdateSubscriptionAsync(Subscription subscription);
        Task<bool> CancelSubscriptionAsync(int id);
        Task<bool> RenewSubscriptionAsync(int id);
    }
} 