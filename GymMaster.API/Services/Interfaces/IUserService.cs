using GymMaster.API.Models;
using GymMaster.API.Models.DTO;

namespace GymMaster.API.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<TrainningSession?>> GetTrainningSessionByUserIdASync(int id);
        Task<User> CreateUserByAdminAsync(CreateUserByAdminDto createUserDto);
    }
}
