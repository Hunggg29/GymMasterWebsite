using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionService _subscriptionService;

        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllSubscriptions()
        {
            var subscriptions = await _subscriptionService.GetAllSubscriptionsAsync();
            return Ok(subscriptions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSubscriptionById(int id)
        {
            var subscription = await _subscriptionService.GetSubscriptionByIdAsync(id);
            if (subscription == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst("id")?.Value);
            if (subscription.UserId != userId && !User.IsInRole("admin"))
                return Forbid();

            return Ok(subscription);
        }

        [HttpGet("my-subscriptions")]
        public async Task<IActionResult> GetMySubscriptions()
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            var subscriptions = await _subscriptionService.GetUserSubscriptionsAsync(userId);
            return Ok(subscriptions);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscription([FromBody] Subscription subscription)
        {
            var userId = int.Parse(User.FindFirst("id")?.Value);
            subscription.UserId = userId;

            try
            {
                var createdSubscription = await _subscriptionService.CreateSubscriptionAsync(subscription);
                return CreatedAtAction(nameof(GetSubscriptionById), new { id = createdSubscription.Id }, createdSubscription);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateSubscription(int id, [FromBody] Subscription subscription)
        {
            if (id != subscription.Id)
                return BadRequest();

            var success = await _subscriptionService.UpdateSubscriptionAsync(subscription);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpPost("{id}/cancel")]
        public async Task<IActionResult> CancelSubscription(int id)
        {
            var subscription = await _subscriptionService.GetSubscriptionByIdAsync(id);
            if (subscription == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst("id")?.Value);
            if (subscription.UserId != userId && !User.IsInRole("admin"))
                return Forbid();

            var success = await _subscriptionService.CancelSubscriptionAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpPost("{id}/renew")]
        public async Task<IActionResult> RenewSubscription(int id)
        {
            var subscription = await _subscriptionService.GetSubscriptionByIdAsync(id);
            if (subscription == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst("id")?.Value);
            if (subscription.UserId != userId && !User.IsInRole("admin"))
                return Forbid();

            var success = await _subscriptionService.RenewSubscriptionAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
} 