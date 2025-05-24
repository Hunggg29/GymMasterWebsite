using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymMaster.API.Data;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;
using System.Security.Claims;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ISubscriptionService _subscriptionService;

        public SubscriptionController(ApplicationDbContext context, ISubscriptionService subcriptionService)
        {
            _context = context;
            _subscriptionService = subcriptionService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllSubCription()
        {
            var subcriptions = await _subscriptionService.GetAllSubscriptionsAsync();
            return Ok(subcriptions);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] SubscriptionDto subscriptionDto)
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
                if (subscriptionDto.UserId != userIdInt)
                {
                    return BadRequest("Invalid user ID");
                }

                // Validate payment exists and is not already used
                var payment = await _context.Payment.FindAsync(subscriptionDto.PaymentId);
                if (payment == null)
                {
                    return BadRequest("Invalid payment ID");
                }

                // Check if payment is already associated with a subscription
                var existingSubscription = await _context.Subscriptions
                    .FirstOrDefaultAsync(s => s.PaymentId == subscriptionDto.PaymentId);
                if (existingSubscription != null)
                {
                    return BadRequest("This payment is already associated with a subscription");
                }

                // Validate plan exists and is active
                var plan = await _context.Plans.FindAsync(subscriptionDto.PlanId);
                if (plan == null)
                {
                    return BadRequest("Invalid plan ID");
                }
                if (!plan.IsActive)
                {
                    return BadRequest("Selected plan is not active");
                }

                // Create subscription
                var subscription = new Subscription
                {
                    UserId = subscriptionDto.UserId,
                    PlanId = subscriptionDto.PlanId,
                    PaymentId = subscriptionDto.PaymentId,
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(plan.DurationInDays),
                    IsActive = subscriptionDto.IsActive,
                    Status = subscriptionDto.Status,
                    AutoRenew = subscriptionDto.AutoRenew,
                    CreatedAt = DateTime.UtcNow
                };

                // Add subscription to database
                _context.Subscriptions.Add(subscription);
                await _context.SaveChangesAsync();

                // Return a simplified response without circular references
                return Ok(new
                {
                    subscription.Id,
                    subscription.UserId,
                    subscription.PlanId,
                    subscription.PaymentId,
                    subscription.StartDate,
                    subscription.EndDate,
                    subscription.IsActive,
                    subscription.Status,
                    subscription.AutoRenew,
                    subscription.CreatedAt,
                    Plan = new
                    {
                        plan.Id,
                        plan.Name,
                        plan.Description,
                        plan.Price,
                        plan.DurationInDays,
                        plan.IsActive
                    },
                    Payment = new
                    {
                        payment.Id,
                        payment.Amount,
                        payment.PaymentMethod,
                        payment.PaymentDate,
                        payment.Status
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating subscription", error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("my-subscriptions")]
        public async Task<IActionResult> GetMySubscriptions()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var subscriptions = await _context.Subscriptions
                    .Include(s => s.Plan)
                    .Include(s => s.Payment)
                    .Where(s => s.UserId == int.Parse(userId))
                    .Select(s => new
                    {
                        s.Id,
                        s.StartDate,
                        s.EndDate,
                        s.IsActive,
                        Plan = new
                        {
                            s.Plan.Name,
                            s.Plan.ImageUrl,
                            s.Plan.Description,
                            s.Plan.Price
                        },
                        Payment = new
                        {
                            s.Payment.PaymentDate,
                            s.Payment.Amount,
                            s.Payment.Status
                        }
                    })
                    .ToListAsync();

                return Ok(subscriptions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching subscriptions", error = ex.Message });
            }
        }
    }
} 