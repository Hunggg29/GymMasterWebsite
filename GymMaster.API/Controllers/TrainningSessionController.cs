using AutoMapper;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainningSessionController : ControllerBase
    {
        private readonly ITrainningSessionService _trainningSessionService;
        private readonly IMapper mapper;

        public TrainningSessionController(ITrainningSessionService trainningSessionService, IMapper mapper)
        {
            _trainningSessionService = trainningSessionService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTrainningSession()
        {
            var trainnningSessions = await _trainningSessionService.GetAllTrainningSessionAsync();
            return Ok(trainnningSessions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrainningSessionById(int id)
        {
            var trainningSession = await _trainningSessionService.GetTrainningSessionByIdAsync(id);
            if(trainningSession == null)
            {
                return NotFound();
            }
            return Ok(trainningSession);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrainningSession([FromBody] CreateTrainningSessionDto createTrainningSessionDto)
        {
            var tranningSession = mapper.Map<TrainningSession>(createTrainningSessionDto);
            await _trainningSessionService.CreateTrainningSessionAsync(tranningSession);
            return CreatedAtAction(nameof(GetTrainningSessionById), new { id = tranningSession.Id }, tranningSession);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrainningSession(int id,[FromBody] UpdateTrainningSessionDto updateTrainningSessionDto)
        {
            var trainningSession = mapper.Map<TrainningSession>(updateTrainningSessionDto);
            trainningSession = await _trainningSessionService.UpdateTrainningSessionAsync(id, trainningSession);
            if(trainningSession == null)
            {
                return NotFound();
            }
            return Ok(trainningSession);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainningSession(int id)
        {
            var trainningSesison = await _trainningSessionService.DeleteTrainningSessionAsync(id);
            if(trainningSesison == null)
            {
                return NotFound();
            }
            return Ok(trainningSesison);
        }
    }
}
