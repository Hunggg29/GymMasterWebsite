using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.DTO;
using System.Security.Claims;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] CreatePaymentDto dto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                // Validate user
                var userIdInt = int.Parse(userId);
                if (dto.UserId != userIdInt)
                {
                    return BadRequest("Invalid user ID");
                }

                // Create payment entity
                var payment = new Payment
                {
                    UserId = dto.UserId,
                    Amount = dto.Amount,
                    PaymentMethod = dto.PaymentMethod,
                    PaymentDate = DateTime.UtcNow,
                    Status = "Completed",
                    Notes = dto.Notes
                };

                // Add payment to database
                _context.Payment.Add(payment);
                await _context.SaveChangesAsync();

                // Map to response DTO
                var response = new PaymentResponseDTO
                {
                    Id = payment.Id,
                    UserId = payment.UserId,
                    Amount = payment.Amount,
                    PaymentMethod = payment.PaymentMethod,
                    PaymentDate = payment.PaymentDate,
                    Status = payment.Status,
                    Notes = payment.Notes
                };

                return Ok(new { success = true, payment = response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "An error occurred while processing payment", error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("my-payments")]
        public async Task<IActionResult> GetMyPayments()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var payments = await _context.Payment
                    .Where(p => p.UserId == int.Parse(userId))
                    .OrderByDescending(p => p.PaymentDate)
                    .Select(p => new PaymentResponseDTO
                    {
                        Id = p.Id,
                        UserId = p.UserId,
                        Amount = p.Amount,
                        PaymentMethod = p.PaymentMethod,
                        PaymentDate = p.PaymentDate,
                        Status = p.Status,
                        Notes = p.Notes
                    })
                    .ToListAsync();

                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching payments", error = ex.Message });
            }
        }
    }
} 