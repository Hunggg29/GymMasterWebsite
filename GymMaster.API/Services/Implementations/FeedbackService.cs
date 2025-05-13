using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Services.Implementations
{
    public class FeedbackService : IFeedbackService
    {
        private readonly ApplicationDbContext _context;

        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacksAsync()
        {
            return await _context.Feedbacks
                .Include(f => f.User)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }

        public async Task<Feedback> GetFeedbackByIdAsync(int id)
        {
            return await _context.Feedbacks
                .Include(f => f.User)
                .FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<IEnumerable<Feedback>> GetUserFeedbacksAsync(int userId)
        {
            return await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .OrderByDescending(f => f.CreatedAt)
                .ToListAsync();
        }

        public async Task<Feedback> CreateFeedbackAsync(Feedback feedback)
        {
            feedback.CreatedAt = DateTime.UtcNow;
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();
            return feedback;
        }

        public async Task<bool> UpdateFeedbackAsync(Feedback feedback)
        {
            var existingFeedback = await _context.Feedbacks.FindAsync(feedback.Id);
            if (existingFeedback == null)
                return false;

            _context.Entry(existingFeedback).CurrentValues.SetValues(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedbackAsync(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null)
                return false;

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 