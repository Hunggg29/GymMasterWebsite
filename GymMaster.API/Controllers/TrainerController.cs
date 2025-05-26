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
        private readonly IMapper mapper;

        public TrainerController(ITrainerService trainerService, IMapper mapper)
        {
            _trainerService = trainerService;
            this.mapper = mapper;
        }

        //Get all trainer
        //GET: https://localhost:portnumber/api/trainer
        [HttpGet]
        public async Task<IActionResult> GetAllTrainer()
        {
            var trainers = await _trainerService.GetAllTrainerAsync();
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

        [HttpPost]
        public async Task<IActionResult> CreateTrainer([FromBody] CreateTrainerDto createTrainerDto)
        {
            var trainer = mapper.Map<Trainer>(createTrainerDto);
            await _trainerService.CreateTrainerAsync(trainer);
            return Ok(trainer);
            
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
