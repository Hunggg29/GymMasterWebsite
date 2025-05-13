using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Services.Implementations
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Subscription>> GetAllSubscriptionsAsync()
        {
            return await _context.Subscriptions
                .Include(s => s.User)
                .Include(s => s.Plan)
                .ToListAsync();
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

        public async Task<bool> RenewSubscriptionAsync(int id)
        {
            var subscription = await _context.Subscriptions
                .Include(s => s.Plan)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (subscription == null)
                return false;

            subscription.StartDate = DateTime.UtcNow;
            subscription.EndDate = subscription.StartDate.AddDays(subscription.Plan.DurationInDays);
            subscription.IsActive = true;

            await _context.SaveChangesAsync();
            return true;
        }
    }
} 