using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface ITrainningSessionService
    {
        Task<IEnumerable<TrainningSession>> GetAllTrainningSessionAsync();
        Task<TrainningSession?> GetTrainningSessionByIdAsync(int id);

        Task<TrainningSession> CreateTrainningSessionAsync(TrainningSession trainningSession);

        Task<TrainningSession?> UpdateTrainningSessionAsync(int id, TrainningSession trainningSession);
        Task<TrainningSession?> DeleteTrainningSessionAsync(int id);
    }
}
