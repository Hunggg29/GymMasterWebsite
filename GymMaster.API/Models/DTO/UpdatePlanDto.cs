using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models.DTO
{
    public class UpdatePlanDto
    {
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Range(1, 3650)]  // Maximum 10 years
        public int DurationInDays { get; set; }

        [StringLength(2048)]
        public string ImageUrl { get; set; }

        [StringLength(50)]
        public string? PlanType { get; set; } = "Standard";

        [Range(0, 100)]
        public int? MaxMembers { get; set; }
    }
}
