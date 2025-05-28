using AutoMapper;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingSessionController : ControllerBase
    {
        private readonly ITrainingSessionService _sessionService;
        private readonly IMapper _mapper;

        public TrainingSessionController(ITrainingSessionService sessionService, IMapper mapper)
        {
            _sessionService = sessionService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSessions()
        {
            var sessions = await _sessionService.GetAllSessionsAsync();
            return Ok(sessions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSessionById(int id)
        {
            var session = await _sessionService.GetSessionByIdAsync(id);
            if (session == null)
            {
                return NotFound();
            }
            return Ok(session);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSession([FromBody] CreateTrainingSessionDto createSessionDto)
        {
            try
            {
                var session = _mapper.Map<TrainningSession>(createSessionDto);
                var createdSession = await _sessionService.CreateSessionAsync(session);
                return CreatedAtAction(nameof(GetSessionById), new { id = createdSession.Id }, createdSession);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSession(int id, [FromBody] UpdateTrainingSessionDto updateSessionDto)
        {
            try
            {
                var session = _mapper.Map<TrainningSession>(updateSessionDto);
                var updatedSession = await _sessionService.UpdateSessionAsync(id, session);
                if (updatedSession == null)
                {
                    return NotFound();
                }
                return Ok(updatedSession);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            var session = await _sessionService.DeleteSessionAsync(id);
            if (session == null)
            {
                return NotFound();
            }
            return Ok(session);
        }

        [HttpGet("trainer/{trainerId}")]
        public async Task<IActionResult> GetSessionsByTrainerId(int trainerId)
        {
            var sessions = await _sessionService.GetSessionsByTrainerIdAsync(trainerId);
            return Ok(sessions);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetSessionsByUserId(int userId)
        {
            var sessions = await _sessionService.GetSessionsByUserIdAsync(userId);
            return Ok(sessions);
        }
    }
} 