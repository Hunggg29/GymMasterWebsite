using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class TrainerService : ITrainerService
    {   
        private readonly ApplicationDbContext _context;
        public TrainerService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Trainer>> GetAllTrainersAsync()
        {
            return await _context.Trainers
                .Include(t => t.User)
                .ToListAsync();
        }

        public async Task<Trainer?> GetTrainerByIdAsync(int id)
        {
            return await _context.Trainers
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.TrainerId == id);
        }

        public async Task<Trainer> CreateTrainerAsync(Trainer trainer)
        {
            await _context.Trainers.AddAsync(trainer);
            await _context.SaveChangesAsync();
            return trainer;
        }

        public async Task<Trainer?> UpdateTrainerAsync(int id, Trainer trainer)
        {
            var existTrainer = await _context.Trainers.FirstOrDefaultAsync(t => t.TrainerId == id);
            if ( trainer == null)
            {
                return null;
            }

            existTrainer.UserId = trainer.UserId;
            existTrainer.PricePerHour = trainer.PricePerHour;
            existTrainer.Specialty = trainer.Specialty;
            existTrainer.Experience = trainer.Experience;

            await _context.SaveChangesAsync();

            return existTrainer;
        }
        public async Task<Trainer?> DeleteTrainerAsync(int id)
        {
            var trainer = await _context.Trainers.FirstOrDefaultAsync(t => t.TrainerId == id);
            if(trainer == null)
            {
                return null;
            }
            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();
            return trainer;
        }

        public async Task<IEnumerable<User>> GetUsersTrainedByTrainerAsync(int trainerId)
        {
            return await _context.TrainingSessions
                .Where(ts => ts.TrainerId == trainerId)
                .Select(ts => ts.User)
                .Distinct()
                .ToListAsync();
        }

        public async Task<IEnumerable<TrainningSession>> GetTrainingSessionsByTrainerIdAsync(int trainerId)
        {
            return await _context.TrainingSessions
                .Where(ts => ts.TrainerId == trainerId)
                .ToListAsync();
        }
    }
}
