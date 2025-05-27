using AutoMapper;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService _equipmentService;
        private readonly IMapper mapper;

        public EquipmentController(IEquipmentService equipmentService, IMapper mapper)
        {
            _equipmentService = equipmentService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEquipment()
        {
            var equipment = await _equipmentService.GetAllEquipmentAsync();
            return Ok(equipment);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEquipmentById(int id)
        {
            var equipment = await _equipmentService.GetEquipmentByIdAsync(id);
            if (equipment == null)
            {
                return NotFound();
            }
            return Ok(equipment);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEquipment([FromBody] CreateEquipmentDto createEquipmentDto)
        {
            var equipment = mapper.Map<Equipment>(createEquipmentDto);
            await _equipmentService.CreateEquipmentAsync(equipment);
            return CreatedAtAction(nameof(GetEquipmentById), new {id = equipment.Id}, equipment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEquipment(int id, [FromBody] UpdateEquipmentDto updateEquipmentDto)
        {
            var equipment = mapper.Map<Equipment>(updateEquipmentDto);
            equipment = await _equipmentService.UpdateEquipmentAsync(id, equipment);
            if(equipment == null)
            {
                return NotFound();
            }
            return Ok(equipment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment(int id)
        {
            var equipment = await _equipmentService.DeleteEquipmentAsync(id);
            if(equipment == null)
            {
                return NotFound();
            }
            return Ok(equipment);
        }
    }
}
