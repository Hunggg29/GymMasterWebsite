using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface ISubscriptionService
    {
        Task<IEnumerable<Subscription>> GetAllSubscriptionsAsync();
        Task<Subscription> GetSubscriptionByIdAsync(int id);
        Task<IEnumerable<Subscription>> GetUserSubscriptionsAsync(int userId);
        Task<Subscription> CreateSubscriptionAsync(Subscription subscription);
        Task<bool> UpdateSubscriptionAsync(Subscription subscription);
        Task<bool> CancelSubscriptionAsync(int id);
        Task<bool> RenewSubscriptionAsync(int id);
    }
} 