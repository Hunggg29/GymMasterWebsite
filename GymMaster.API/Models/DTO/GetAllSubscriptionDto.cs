namespace GymMaster.API.Models.DTO
{
    public class GetAllSubscriptionDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }

        // Trường từ User
        public string Username { get; set; }

        // Trường từ Plan
        public string PlanName { get; set; }
        public string PlanImageUrl { get; set; }
        public string PlanDescription { get; set; }
        public int DurationInDays { get; set; }
        public decimal PlanPrice { get; set; }

        // Trường từ Payment
        public DateTime PaymentDate { get; set; }
        public decimal PaymentAmount { get; set; }
        public string PaymentStatus { get; set; }
    }
}
