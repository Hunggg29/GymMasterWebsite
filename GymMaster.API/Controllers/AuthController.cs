using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.DTO;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ApplicationDbContext _context;

        public AuthController(IAuthService authService, ApplicationDbContext context)
        {
            _authService = authService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var (success, token) = await _authService.LoginAsync(request.Email, request.Password);
            if (!success)
                return Unauthorized(new { message = token });
            
            // Fetch the user by email (since user is not available from claims at this point)
            var user = await _authService.GetUserByEmailAsync(request.Email);
            // Remove sensitive info
            if (user != null) user.PasswordHash = null;

            return Ok(new { user, token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                Phone = request.Phone,
                FullName = request.FullName,
                Role = "user"
            };

            var (success, message) = await _authService.RegisterAsync(user, request.Password);
            if (!success)
                return BadRequest(new { message });

            return Ok(new { message });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            var user = await _authService.GetUserByIdAsync(userId);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut("profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto updateProfileDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

                if (user == null)
                {
                    return NotFound("User not found");
                }

                // Check if username is taken by another user
                if (await _context.Users.AnyAsync(u => u.Username == updateProfileDto.Username && u.Id != user.Id))
                {
                    return BadRequest("Username already exists");
                }

                // Update only the allowed fields
                user.Username = updateProfileDto.Username;
                user.FullName = updateProfileDto.FullName;
                user.Phone = updateProfileDto.Phone;
                user.Birthday = updateProfileDto.Birthday;

                await _context.SaveChangesAsync();

                // Return updated user without sensitive information
                return Ok(new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.FullName,
                    user.Phone,
                    user.Birthday,
                    user.Role,
                    user.CreatedAt
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the profile");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin-auth")]
        public IActionResult AdminAuth()
        {
            return Ok(new { ok = true });
        }
        [Authorize(Roles = "staff")]
        [HttpGet("staff-auth")]
        public IActionResult StaffAuth()
        {
            return Ok(new { ok = true });
        }

        [Authorize]
        [HttpGet("user-auth")]
        public IActionResult UserAuth()
        {
            return Ok(new { ok = true });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Phone { get; set; }
        public string FullName { get; set; }
    }
} 