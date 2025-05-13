using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Services.Implementations
{
    public class PlanService : IPlanService
    {
        private readonly ApplicationDbContext _context;

        public PlanService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Plan>> GetAllPlansAsync()
        {
            return await _context.Plans.ToListAsync();
        }

        public async Task<Plan> GetPlanByIdAsync(int id)
        {
            return await _context.Plans.FindAsync(id);
        }

        public async Task<Plan> CreatePlanAsync(Plan plan)
        {
            await _context.Plans.AddAsync(plan);
            await _context.SaveChangesAsync();
            return plan;
        }

        public async Task<bool> UpdatePlanAsync(Plan plan)
        {
            var existingPlan = await _context.Plans.FindAsync(plan.Id);
            if (existingPlan == null)
                return false;

            _context.Entry(existingPlan).CurrentValues.SetValues(plan);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePlanAsync(int id)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
                return false;

            _context.Plans.Remove(plan);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> TogglePlanStatusAsync(int id)
        {
            var plan = await _context.Plans.FindAsync(id);
            if (plan == null)
                return false;

            plan.IsActive = !plan.IsActive;
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 