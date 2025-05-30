using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using GymMaster.API.Models.DTO;
using AutoMapper;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;
        private readonly ISubscriptionService _subscriptionService;
        private readonly ITrainingSessionService _sessionService;
        private readonly IMapper _mapper;

        public UsersController(
            ApplicationDbContext context, 
            IUserService userService, 
            ISubscriptionService subscriptionService,
            ITrainingSessionService sessionService,
            IMapper mapper)
        {
            _context = context;
            _userService = userService;
            _subscriptionService = subscriptionService;
            _sessionService = sessionService;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        [HttpGet("{id}/subscriptions")]
        public async Task<IActionResult> GetUserSubscriptions(int id)
        {
            var subscriptions = await _subscriptionService.GetUserSubscriptionsAsync(id);
            var subscriptionDtos = _mapper.Map<IEnumerable<GetAllSubscriptionDto>>(subscriptions);
            return Ok(subscriptionDtos);
        }

        [HttpGet("{id}/trainingSessions")]
        public async Task<IActionResult> GetUserTrainingSessions(int id)
        {
            var sessions = await _sessionService.GetSessionsByUserIdAsync(id);
            var sessionDtos = _mapper.Map<IEnumerable<TrainingSessionDto>>(sessions);
            return Ok(sessionDtos);
        }
    }
} 