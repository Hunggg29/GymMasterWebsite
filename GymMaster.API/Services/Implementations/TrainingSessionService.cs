using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class TrainingSessionService : ITrainingSessionService
    {
        private readonly ApplicationDbContext _context;

        public TrainingSessionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TrainningSession>> GetAllSessionsAsync()
        {
            return await _context.TrainingSessions
                .Include(ts => ts.User)
                .Include(ts => ts.Trainer)
                    .ThenInclude(t => t.User)
                .Include(ts => ts.GymRoom)
                .ToListAsync();
        }

        public async Task<TrainningSession?> GetSessionByIdAsync(int id)
        {
            return await _context.TrainingSessions
                .Include(ts => ts.User)
                .Include(ts => ts.Trainer)
                    .ThenInclude(t => t.User)
                .Include(ts => ts.GymRoom)
                .FirstOrDefaultAsync(ts => ts.Id == id);
        }

        public async Task<TrainningSession> CreateSessionAsync(TrainningSession session)
        {
            // Kiểm tra các điều kiện trước khi tạo session
            if (!await IsTrainerAvailableAsync(session.TrainerId, session.StartTime, session.EndTime))
            {
                throw new Exception("Trainer is not available at this time");
            }

            if (!await IsUserEligibleAsync(session.UserId))
            {
                throw new Exception("You have not subcribed to any plan");
            }

            await _context.TrainingSessions.AddAsync(session);
            await _context.SaveChangesAsync();
            return session;
        }

        public async Task<TrainningSession?> UpdateSessionAsync(int id, TrainningSession session)
        {
            var existingSession = await _context.TrainingSessions
                .Include(ts => ts.User)
                .Include(ts => ts.Trainer)
                .Include(ts => ts.GymRoom)
                .FirstOrDefaultAsync(ts => ts.Id == id);
                
            if (existingSession == null)
            {
                return null;
            }

            // Kiểm tra các điều kiện nếu thời gian thay đổi
            if (existingSession.StartTime != session.StartTime || existingSession.EndTime != session.EndTime)
            {
                if (!await IsTrainerAvailableAsync(session.TrainerId, session.StartTime, session.EndTime))
                {
                    throw new Exception("Trainer is not available at this time");
                }

                if (!await IsRoomAvailableAsync(session.RoomId, session.StartTime, session.EndTime))
                {
                    throw new Exception("Room is not available at this time");
                }
            }

            existingSession.StartTime = session.StartTime;
            existingSession.EndTime = session.EndTime;
            existingSession.SessionType = session.SessionType;
            existingSession.AttendanceStatus = session.AttendanceStatus;
            existingSession.Notes = session.Notes;

            await _context.SaveChangesAsync();
            return existingSession;
        }

        public async Task<TrainningSession?> DeleteSessionAsync(int id)
        {
            var session = await _context.TrainingSessions
                .Include(ts => ts.User)
                .Include(ts => ts.Trainer)
                .Include(ts => ts.GymRoom)
                .FirstOrDefaultAsync(ts => ts.Id == id);
                
            if (session == null)
            {
                return null;
            }

            _context.TrainingSessions.Remove(session);
            await _context.SaveChangesAsync();
            return session;
        }

        public async Task<bool> IsTrainerAvailableAsync(int trainerId, DateTime startTime, DateTime endTime)
        {
            // Kiểm tra xem trainer có session nào trong khoảng thời gian này không
            var existingSessions = await _context.TrainingSessions
                .Where(ts => ts.TrainerId == trainerId &&
                            ((ts.StartTime <= startTime && ts.EndTime > startTime) ||
                             (ts.StartTime < endTime && ts.EndTime >= endTime) ||
                             (ts.StartTime >= startTime && ts.EndTime <= endTime)))
                .ToListAsync();

            return !existingSessions.Any();
        }

        public async Task<bool> IsRoomAvailableAsync(int roomId, DateTime startTime, DateTime endTime)
        {
            // Kiểm tra xem phòng có session nào trong khoảng thời gian này không
            var existingSessions = await _context.TrainingSessions
                .Where(ts => ts.RoomId == roomId &&
                            ((ts.StartTime <= startTime && ts.EndTime > startTime) ||
                             (ts.StartTime < endTime && ts.EndTime >= endTime) ||
                             (ts.StartTime >= startTime && ts.EndTime <= endTime)))
                .ToListAsync();

            return !existingSessions.Any();
        }

        public async Task<bool> IsUserEligibleAsync(int userId)
        {
            var hasActiveSubcription = await _context.Subscriptions
                                                .AnyAsync(s => s.UserId == userId && s.EndDate > DateTime.UtcNow);
   
            return hasActiveSubcription;
        }

        public async Task<IEnumerable<TrainningSession>> GetSessionsByTrainerIdAsync(int trainerId)
        {
            return await _context.TrainingSessions
                .Include(ts => ts.User)
                .Include(ts => ts.Trainer)
                    .ThenInclude(t => t.User)
                .Include(ts => ts.GymRoom)
                .Where(ts => ts.TrainerId == trainerId)
                .ToListAsync();
        }

        public async Task<IEnumerable<TrainningSession>> GetSessionsByUserIdAsync(int userId)
        {
            return await _context.TrainingSessions
                .Include(ts => ts.User)
                .Include(ts => ts.Trainer)
                    .ThenInclude(t => t.User)
                .Include(ts => ts.GymRoom)
                .Where(ts => ts.UserId == userId)
                .ToListAsync();
        }
    }
} 