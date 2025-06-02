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
            var sessionDtos = _mapper.Map<IEnumerable<TrainingSessionDto>>(sessions);
            return Ok(sessionDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSessionById(int id)
        {
            var session = await _sessionService.GetSessionByIdAsync(id);
            if (session == null)
            {
                return NotFound();
            }
            var sessionDto = _mapper.Map<TrainingSessionDto>(session);
            return Ok(sessionDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSession([FromBody] CreateTrainingSessionDto createSessionDto)
        {
            try
            {
                var session = _mapper.Map<TrainningSession>(createSessionDto);
                var createdSession = await _sessionService.CreateSessionAsync(session);
                var createdSessionDto = _mapper.Map<TrainingSessionDto>(createdSession);
                return CreatedAtAction(nameof(GetSessionById), new { id = createdSession.Id }, createdSessionDto);
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
                var updatedSessionDto = _mapper.Map<TrainingSessionDto>(updatedSession);
                return Ok(updatedSessionDto);
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
            var sessionDto = _mapper.Map<TrainingSessionDto>(session);
            return Ok(sessionDto);
        }
    }
} 