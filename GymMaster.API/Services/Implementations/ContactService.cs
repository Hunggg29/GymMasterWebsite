using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Services.Implementations
{
    public class ContactService : IContactService
    {
        private readonly ApplicationDbContext _context;

        public ContactService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ContactUs>> GetAllContactsAsync()
        {
            return await _context.ContactUs
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }

        public async Task<ContactUs> GetContactByIdAsync(int id)
        {
            return await _context.ContactUs.FindAsync(id);
        }

        public async Task<ContactUs> CreateContactAsync(ContactUs contact)
        {
            contact.CreatedAt = DateTime.UtcNow;
            contact.IsRead = false;

            await _context.ContactUs.AddAsync(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> MarkAsReadAsync(int id)
        {
            var contact = await _context.ContactUs.FindAsync(id);
            if (contact == null)
                return false;

            contact.IsRead = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteContactAsync(int id)
        {
            var contact = await _context.ContactUs.FindAsync(id);
            if (contact == null)
                return false;

            _context.ContactUs.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 