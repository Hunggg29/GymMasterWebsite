﻿using AutoMapper;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GymRoomController : ControllerBase
    {
        private readonly IGymRoomService _gymRoomService;
        private readonly IMapper mapper;

        public GymRoomController(IGymRoomService gymRoomService, IMapper mapper)
        {
            _gymRoomService = gymRoomService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGymRoom()
        {
            var gymRooms = await _gymRoomService.GetAllGymRoomAsync();
            return  Ok(gymRooms);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGymRoomById(int id)
        {
            var gymRoom = await _gymRoomService.GetGymRoomByIdAsync(id);
            if(gymRoom == null)
            {
                return NotFound();
            }
            return Ok(gymRoom);
        }

        [HttpGet("{id}/equipment")]
        public async Task<IActionResult> GetEquipmentByRoomId(int id)
        {
            var equipment = await _gymRoomService.GetEquipmentByRoomIdAsync(id);
            return Ok(equipment);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGymRoom([FromBody] CreateGymRoomDto createGymRoomDto)
        {
            var gymRoom = mapper.Map<GymRoom>(createGymRoomDto);

            await _gymRoomService.CreateGymRoomAsync(gymRoom);
            return CreatedAtAction(nameof(GetGymRoomById), new {id = gymRoom.Id}, gymRoom);
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>UpdateGymRoomAsync(int id,[FromBody] UpdateGymRoomDto updateGymRoomDto)
        {
            var gymRoom = mapper.Map<GymRoom>(updateGymRoomDto);
            gymRoom = await _gymRoomService.UpdateGymRoomAsync(id, gymRoom);
            if(gymRoom == null)
            {
                return NotFound();  
            }
            return Ok(gymRoom);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult>DeleteGymRoomAsync(int id)
        {
            var room = await _gymRoomService.DeleteGymRoomAsync(id);
            if(room == null)
            {
                return NotFound();
            }
            return Ok(room);
        }
    }
}
