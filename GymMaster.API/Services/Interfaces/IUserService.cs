using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<TrainningSession?>> GetTrainningSessionByUserIdASync(int id);

    }
}
