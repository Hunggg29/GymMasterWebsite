using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface ITrainerService
    {
        Task<IEnumerable<Trainer>> GetAllTrainersAsync();
        
        Task<Trainer?> GetTrainerByIdAsync(int id);
        Task<Trainer> CreateTrainerAsync(Trainer trainer);

        Task<Trainer?> UpdateTrainerAsync(int id, Trainer trainer);
        Task<Trainer?> DeleteTrainerAsync(int id);

        Task<IEnumerable<User>> GetUsersTrainedByTrainerAsync(int trainerId);
        Task<IEnumerable<TrainningSession>> GetTrainingSessionsByTrainerIdAsync(int trainerId);
    }
}
