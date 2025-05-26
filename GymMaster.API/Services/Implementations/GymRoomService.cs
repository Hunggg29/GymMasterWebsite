using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class GymRoomService : IGymRoomService
    {
        private readonly ApplicationDbContext _context;
        public GymRoomService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GymRoom>> GetAllGymRoomAsync()
        {
            return await _context.GymRoom.ToListAsync();
        }

        public async Task<GymRoom?> GetGymRoomByIdAsync(int id)
        {
            return await _context.GymRoom.FirstOrDefaultAsync(g => g.Id == id);
           
        }

        public async Task<GymRoom> CreateGymRoomAsync(GymRoom room)
        {
            await _context.GymRoom.AddAsync(room);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task<GymRoom?> UpdateGymRoomAsync(int id, GymRoom room)
        {
            var existRoom = await _context.GymRoom.FirstOrDefaultAsync(r => r.Id == id);
            if(existRoom == null)
            {
                return null;
            }
            existRoom.RoomType = room.RoomType;
            existRoom.RoomQuantity = room.RoomQuantity;
            existRoom.RoomStatus = room.RoomStatus;
            existRoom.RoomName = room.RoomName;
            await _context.SaveChangesAsync();
            return existRoom;
        }

        public async Task<GymRoom?> DeleteGymRoomAsync(int id)
        {
            var room = await _context.GymRoom.FirstOrDefaultAsync(r => r.Id == id);
            if (room == null)
            {
                return null;
            }
            _context.GymRoom.Remove(room);
            await _context.SaveChangesAsync();
            return room;
        }
    }
}
