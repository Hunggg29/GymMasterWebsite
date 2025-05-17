using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.Models
{
    public class Plan
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        [StringLength(1000)]
        public string Description { get; set; }
        
        [Required]
        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }
        
        [Required]
        [Range(1, 3650)]  // Maximum 10 years
        public int DurationInDays { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        [Required]
        [StringLength(2048)]
        public string ImageUrl { get; set; }

        [StringLength(50)]
        public string? PlanType { get; set; } = "Standard";

        [Range(0, 100)]
        public int? MaxMembers { get; set; }

        public ICollection<Subscription> Subscriptions { get; set; }
    }
} 