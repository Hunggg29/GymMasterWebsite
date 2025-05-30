using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using GymMaster.API.Models.DTO;

namespace GymMaster.API.Services.Implementations
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GetAllSubscriptionDto>> GetAllSubscriptionsAsync()
        {
            var subscriptions = await _context.Subscriptions
                                .Include(s => s.Plan)
                                .Include(s => s.User)
                                .Include(s => s.Payment)
                                .Select(s => new GetAllSubscriptionDto
                                {
                                    Id = s.Id,
                                    StartDate = s.StartDate,
                                    EndDate = s.EndDate,
                                    IsActive = s.IsActive,
                                    Username = s.User.Username,
                                    PlanName = s.Plan.Name,
                                    PlanImageUrl = s.Plan.ImageUrl,
                                    PlanDescription = s.Plan.Description,
                                    PlanPrice = s.Plan.Price,
                                    PaymentDate = s.Payment.PaymentDate,
                                    PaymentAmount = s.Payment.Amount,
                                    PaymentStatus = s.Payment.Status
                                })
                                .ToListAsync();

            return subscriptions;
        }

        public async Task<Subscription> GetSubscriptionByIdAsync(int id)
        {
            return await _context.Subscriptions
                .Include(s => s.User)
                .Include(s => s.Plan)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<Subscription>> GetUserSubscriptionsAsync(int userId)
        {
            return await _context.Subscriptions
                .Include(s => s.Plan)
                .Include(s => s.User)
                .Where(s => s.UserId == userId)
                .ToListAsync();
        }

        public async Task<Subscription> CreateSubscriptionAsync(Subscription subscription)
        {
            var plan = await _context.Plans.FindAsync(subscription.PlanId);
            if (plan == null)
                throw new ArgumentException("Invalid plan ID");

            subscription.StartDate = DateTime.UtcNow;
            subscription.EndDate = subscription.StartDate.AddDays(plan.DurationInDays);
            subscription.IsActive = true;

            await _context.Subscriptions.AddAsync(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }

        public async Task<bool> UpdateSubscriptionAsync(Subscription subscription)
        {
            var existingSubscription = await _context.Subscriptions.FindAsync(subscription.Id);
            if (existingSubscription == null)
                return false;

            _context.Entry(existingSubscription).CurrentValues.SetValues(subscription);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelSubscriptionAsync(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
                return false;

            subscription.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<RenewedSubscriptionDto> RenewSubscriptionAsync(int id)
        {
            var subscription = await _context.Subscriptions
                .Include(s => s.Plan)
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subscription == null)
                return null;

            subscription.EndDate = subscription.EndDate.AddDays(subscription.Plan.DurationInDays);
            subscription.IsActive = true;
            subscription.AutoRenew = true;

            await _context.SaveChangesAsync();

            return new RenewedSubscriptionDto
            {
                Id = subscription.Id,
                StartDate = subscription.StartDate,
                EndDate = subscription.EndDate,
                IsActive = subscription.IsActive,
                AutoRenew = subscription.AutoRenew,
                Status = subscription.Status,
                UserId = subscription.UserId,
                Username = subscription.User.Username,
                PlanId = subscription.PlanId,
                PlanName = subscription.Plan.Name,
                PlanDescription = subscription.Plan.Description,
                PlanPrice = subscription.Plan.Price,
                PlanDurationInDays = subscription.Plan.DurationInDays
            };
        }

        public async Task<Subscription?> DeleteSubscriptionAsync(int id)
        {
            var subscription = await _context.Subscriptions.FirstOrDefaultAsync(s => s.Id == id);

            if(subscription == null)
            {
                return null;
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }
    }
} 