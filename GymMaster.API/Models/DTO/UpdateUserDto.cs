using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace GymMaster.API.Models.DTO
{
    public class UpdateUserDto
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

    }
}
