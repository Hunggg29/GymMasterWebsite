using System.ComponentModel.DataAnnotations;

namespace GymMaster.API.DTO
{
    public class CreatePaymentDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentMethod { get; set; }

        public string? Notes { get; set; }
    }

    public class PaymentResponseDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Status { get; set; }
        public string? Notes { get; set; }
    }
}