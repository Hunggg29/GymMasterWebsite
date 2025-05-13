using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<(bool success, string token)> LoginAsync(string email, string password);
        Task<(bool success, string message)> RegisterAsync(User user, string password);
        Task<User> GetUserByIdAsync(int id);
        Task<bool> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
    }
} 