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
        Task<RenewedSubscriptionDto> RenewSubscriptionAsync(int subscriptionId);
        Task<bool> UpdateSubscriptionAsync(Subscription subscription);
        Task<bool> CancelSubscriptionAsync(int id);
        Task<Subscription?> DeleteSubscriptionAsync(int id);
        Task<bool> ToggleAutoRenewAsync(int id, bool autoRenew);
    }
} 