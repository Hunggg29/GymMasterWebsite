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

        public async Task<Plan?> UpdatePlanAsync(int id, Plan updatedPlan)
        {
            try 
            {
                var existingPlan = await _context.Plans.FirstOrDefaultAsync(p => p.Id == id);
                if (existingPlan == null)
                    return null;

                // Chỉ cập nhật các trường cần thiết
                existingPlan.Name = updatedPlan.Name;
                existingPlan.Description = updatedPlan.Description;
                existingPlan.Price = updatedPlan.Price;
                existingPlan.DurationInDays = updatedPlan.DurationInDays;
                existingPlan.ImageUrl = updatedPlan.ImageUrl;
                existingPlan.PlanType = updatedPlan.PlanType;
                existingPlan.MaxMembers = updatedPlan.MaxMembers;

                await _context.SaveChangesAsync();
                return existingPlan;
            }
            catch (Exception ex)
            {
                // Log lỗi ở đây
                throw new Exception($"Error updating plan: {ex.Message}");
            }
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