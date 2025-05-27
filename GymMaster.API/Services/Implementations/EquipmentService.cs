using AutoMapper;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class EquipmentService : IEquipmentService
    {   
        private readonly ApplicationDbContext _context;
        public EquipmentService(ApplicationDbContext context)
        {
            _context = context;
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
            var existEquipment = await _context.Equipment.FirstOrDefaultAsync(e => e.Id == id);
            if (existEquipment == null) 
            {
                return null;
            }
            existEquipment.ImportDate = equipment.ImportDate;
            existEquipment.Name = equipment.Name;
            existEquipment.Status = equipment.Status;
            existEquipment.Quantity = equipment.Quantity;
            existEquipment.Warranty = equipment.Warranty;
            existEquipment.RoomId = equipment.RoomId;
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
