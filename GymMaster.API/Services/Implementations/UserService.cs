using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

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

        public async Task<User> CreateUserByAdminAsync(CreateUserByAdminDto createUserDto)
        {
            // Check if username or email already exists
            if (await _context.Users.AnyAsync(u => u.Username == createUserDto.Username))
            {
                throw new Exception("Username already exists");
            }

            if (await _context.Users.AnyAsync(u => u.Email == createUserDto.Email))
            {
                throw new Exception("Email already exists");
            }

            // Create new user
            var user = new User
            {
                Username = createUserDto.Username,
                Email = createUserDto.Email,
                PasswordHash = BC.HashPassword(createUserDto.Password),
                Phone = createUserDto.Phone,
                Role = createUserDto.Role,
                Birthday = createUserDto.Birthday,
                FullName = createUserDto.FullName,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // If user is a trainer, create trainer profile
            if (createUserDto.Role.ToLower() == "trainer")
            {
                if (string.IsNullOrEmpty(createUserDto.Specialty) || 
                    !createUserDto.Experience.HasValue || 
                    !createUserDto.PricePerHour.HasValue)
                {
                    throw new Exception("Trainer profile requires specialty, experience, and price per hour");
                }

                var trainer = new Trainer
                {
                    UserId = user.Id,
                    Specialty = createUserDto.Specialty,
                    Experience = createUserDto.Experience.Value,
                    PricePerHour = createUserDto.PricePerHour.Value
                };

                _context.Trainers.Add(trainer);
                await _context.SaveChangesAsync();
            }

            return user;
        }
    }
}
