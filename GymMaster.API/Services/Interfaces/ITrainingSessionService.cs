using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface ITrainingSessionService
    {
        Task<IEnumerable<TrainningSession>> GetAllSessionsAsync();
        Task<TrainningSession?> GetSessionByIdAsync(int id);
        Task<TrainningSession> CreateSessionAsync(TrainningSession session);
        Task<TrainningSession?> UpdateSessionAsync(int id, TrainningSession session);
        Task<TrainningSession?> DeleteSessionAsync(int id);
        
        // Các phương thức kiểm tra
        Task<bool> IsTrainerAvailableAsync(int trainerId, DateTime startTime, DateTime endTime);
        Task<bool> IsRoomAvailableAsync(int roomId, DateTime startTime, DateTime endTime);
        Task<bool> IsUserEligibleAsync(int userId);
        
        // Lấy danh sách session theo trainer
        Task<IEnumerable<TrainningSession>> GetSessionsByTrainerIdAsync(int trainerId);
        
        // Lấy danh sách session theo user
        Task<IEnumerable<TrainningSession>> GetSessionsByUserIdAsync(int userId);
    }
} 