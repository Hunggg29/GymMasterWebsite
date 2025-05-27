using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class TrainningSessionService : ITrainningSessionService
    {   
        private readonly ApplicationDbContext _context;

        public TrainningSessionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<TrainningSession> CreateTrainningSessionByNameAsync(TrainningSession trainningSession)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TrainningSession>> GetAllTrainningSessionAsync()
        {
            return await _context.TrainingSessions.ToListAsync();
        }

        public async Task<TrainningSession?> GetTrainningSessionByIdAsync(int id)
        {
            return await _context.TrainingSessions.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TrainningSession> CreateTrainningSessionAsync(TrainningSession trainningSession)
        {
            await _context.TrainingSessions.AddAsync(trainningSession);
            await _context.SaveChangesAsync();
            return trainningSession;
        }

        public async Task<TrainningSession?> UpdateTrainningSessionAsync(int id, TrainningSession trainningSession)
        {
            var existTrainningSession = await _context.TrainingSessions.FirstOrDefaultAsync(t => t.Id == id);
            if (existTrainningSession == null)
            {
                return null;
            }
            existTrainningSession.TrainerId = trainningSession.TrainerId;
            existTrainningSession.UserId = trainningSession.UserId;
            existTrainningSession.RoomId = trainningSession.RoomId;
            existTrainningSession.AttendanceStatus = trainningSession.AttendanceStatus;
            existTrainningSession.Date = trainningSession.Date;
            existTrainningSession.EndTime = trainningSession.EndTime;
            existTrainningSession.StartTime = trainningSession.StartTime;
            existTrainningSession.SessionType = trainningSession.SessionType;
            existTrainningSession.Notes = trainningSession.Notes;

            await _context.SaveChangesAsync();
            return existTrainningSession;
        }

        public async Task<TrainningSession?> DeleteTrainningSessionAsync(int id)
        {
            var trainningSession = await _context.TrainingSessions.FirstOrDefaultAsync(t => t.Id == id);
            if(trainningSession == null)
            {
                return null;
            }
            _context.TrainingSessions.Remove(trainningSession);
            await _context.SaveChangesAsync();
            return trainningSession;
        }
    }
}
