using AutoMapper;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using GymMaster.API.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class EquipmentService : IEquipmentService
    {   
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;

        public EquipmentService(ApplicationDbContext context, IEmailService emailService, IMapper mapper)
        {
            _context = context;
            _emailService = emailService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Equipment>> GetAllEquipmentAsync()
        {
            return await _context.Equipment.ToListAsync();
        }

        public async Task<Equipment?> GetEquipmentByIdAsync(int id)
        {
            return await _context.Equipment.FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Equipment> CreateEquipmentAsync(Equipment equipment)
        {
            await _context.Equipment.AddAsync(equipment);
            await _context.SaveChangesAsync();
            return equipment;
        }

        public async Task<Equipment?> UpdateEquipmentAsync(int id, Equipment equipment)
        {
            var existEquipment = await _context.Equipment
                .FirstOrDefaultAsync(e => e.Id == id);
            
            if (existEquipment == null) 
            {
                return null;
            }

            // Check if status changed to "Broken"
            if (equipment.Status == "Broken" && existEquipment.Status != "Broken")
            {
                await _emailService.SendEquipmentMaintenanceEmailAsync(
                    equipment.Name,
                    id.ToString()
                );
            }

            // Update equipment properties
            existEquipment.Name = equipment.Name;
            existEquipment.Quantity = equipment.Quantity;
            existEquipment.ImportDate = equipment.ImportDate;
            existEquipment.Warranty = equipment.Warranty;
            existEquipment.Status = equipment.Status;

            await _context.SaveChangesAsync();
            return existEquipment;
        }

        public async Task<Equipment?> DeleteEquipmentAsync(int id)
        {
            var equipment = await _context.Equipment.FirstOrDefaultAsync(e => e.Id == id);
            if(equipment == null)
            {
                return null;
            }
            _context.Remove(equipment);
            await _context.SaveChangesAsync();
            return equipment;
        }
    }
}
