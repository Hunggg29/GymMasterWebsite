using GymMaster.API.Models;

namespace GymMaster.API.Services.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<ContactUs>> GetAllContactsAsync();
        Task<ContactUs> GetContactByIdAsync(int id);
        Task<ContactUs> CreateContactAsync(ContactUs contact);
        Task<bool> MarkAsReadAsync(int id);
        Task<bool> DeleteContactAsync(int id);
    }
} 