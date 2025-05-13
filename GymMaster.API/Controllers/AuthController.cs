using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
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

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] User user)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            if (userId != user.Id)
                return Forbid();

            var success = await _authService.UpdateUserAsync(user);
            if (!success)
                return NotFound();

            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("admin-auth")]
        public IActionResult AdminAuth()
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
    }
} 