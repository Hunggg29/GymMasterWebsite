using System;

namespace GymMaster.API.Models.DTO
{
    public class RenewedSubscriptionDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public bool AutoRenew { get; set; }
        public string Status { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public int PlanId { get; set; }
        public string PlanName { get; set; }
        public string PlanDescription { get; set; }
        public decimal PlanPrice { get; set; }
        public int PlanDurationInDays { get; set; }
    }
} 