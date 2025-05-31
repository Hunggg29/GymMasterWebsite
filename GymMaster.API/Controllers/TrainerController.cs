using AutoMapper;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainerController : ControllerBase
    {
        
        private readonly ITrainerService _trainerService;
        private readonly ITrainingSessionService _sessionService;
        private readonly IMapper mapper;

        public TrainerController(ITrainerService trainerService, IMapper mapper, ITrainingSessionService trainingSessionService)
        {
            _trainerService = trainerService;
            _sessionService = trainingSessionService;
            this.mapper = mapper;
        }

        //Get all trainer
        //GET: https://localhost:portnumber/api/trainer
        [HttpGet]
        public async Task<IActionResult> GetAllTrainers()
        {
            var trainers = await _trainerService.GetAllTrainersAsync();
            return Ok(trainers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTrainerById(int id)
        {
            var trainer = await _trainerService.GetTrainerByIdAsync(id);
            if(trainer == null)
            {
                return NotFound();
            }
            return Ok(trainer);
        }

        [HttpGet("{id}/users")]
        public async Task<IActionResult> GetUsersTrainedByTrainer(int id)
        {
            var users = await _trainerService.GetUsersTrainedByTrainerAsync(id);
            return Ok(users);
        }

        [HttpGet("{id}/sessions")]
        public async Task<IActionResult> GetTrainingSessionsByTrainerId(int id)
        {
            var sessions = await _sessionService.GetSessionsByTrainerIdAsync(id);
            var sessionDtos = mapper.Map<IEnumerable<TrainingSessionDto>>(sessions);
            return Ok(sessionDtos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTrainer([FromBody] CreateTrainerDto createTrainerDto)
        {
            var trainer = mapper.Map<Trainer>(createTrainerDto);
            await _trainerService.CreateTrainerAsync(trainer);
            return CreatedAtAction(nameof(GetTrainerById), new {id = trainer.TrainerId}, trainer);
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTrainer(int id, [FromBody] UpdateTrainerDto updateTrainerDto)
        {
            var trainer = mapper.Map<Trainer>(updateTrainerDto);

            trainer = await _trainerService.UpdateTrainerAsync(id, trainer);
            if(trainer == null)
            {
                return NotFound();
            }
            return Ok(trainer);  
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var trainer = await _trainerService.DeleteTrainerAsync(id);
            if(trainer == null)
            {
                return NotFound();
            }
            return Ok(trainer);

        }

       
        
    }
}
