using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
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
                .Include("User")
                .ToListAsync();
        }

        public async Task<Trainer?> GetTrainerByIdAsync(int id)
        {
            return await _context.Trainers
                .Include("User")
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

        public async Task<IEnumerable<UserDto>> GetUsersTrainedByTrainerAsync(int userId)
        {
            var trainer = await _context.Trainers.FirstOrDefaultAsync(t => t.UserId == userId);
            if (trainer == null)
                return new List<UserDto>();

            return await _context.TrainingSessions
                .Where(ts => ts.TrainerId == trainer.TrainerId)
                .Join(_context.Users,
                    ts => ts.UserId,
                    u => u.Id,
                    (ts, u) => new UserDto
                    {
                        Id = u.Id,
                        Username = u.Username,
                        Email = u.Email,
                        Phone = u.Phone,
                        FullName = u.FullName
                    })
                .Distinct()
                .ToListAsync();
        }
    }
}
