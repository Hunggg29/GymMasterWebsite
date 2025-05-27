using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        public UserService(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }
        public async Task<IEnumerable<TrainningSession?>> GetTrainningSessionByUserIdASync(int userId)
        {
            return await _context.TrainingSessions
                .Where(s => s.UserId == userId)
                .ToListAsync();
        }
    }
}
