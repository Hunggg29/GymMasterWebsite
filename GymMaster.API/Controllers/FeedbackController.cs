using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;
using System.Security.Claims;
using GymMaster.API.Models.DTO;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
            var feedbackDtos = feedbacks.Select(f => new FeedbackDto
            {
                Id = f.Id,
                UserName = f.User.Username,
                Message = f.Message,
                Rating = f.Rating,
                CreatedAt = f.CreatedAt
            }).ToList();
            return Ok(feedbackDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFeedbackById(int id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return NotFound();

            return Ok(feedback);
        }

        [HttpGet("my-feedbacks")]
        [Authorize]
        public async Task<IActionResult> GetMyFeedbacks()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var feedbacks = await _feedbackService.GetUserFeedbacksAsync(userId);
            return Ok(feedbacks);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateFeedback([FromBody] CreateFeedbackDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var feedback = new Feedback
            {
                UserId = userId,
                Message = dto.Message,
                Rating = dto.Rating
            };

            var createdFeedback = await _feedbackService.CreateFeedbackAsync(feedback);
            return CreatedAtAction(nameof(GetFeedbackById), new { id = createdFeedback.Id }, createdFeedback);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateFeedback(int id, [FromBody] Feedback feedback)
        {
            if (id != feedback.Id)
                return BadRequest();

            var existingFeedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (existingFeedback == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (existingFeedback.UserId != userId && !User.IsInRole("admin"))
                return Forbid();

            var success = await _feedbackService.UpdateFeedbackAsync(feedback);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return NotFound();

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            if (feedback.UserId != userId && !User.IsInRole("admin"))
                return Forbid();

            var success = await _feedbackService.DeleteFeedbackAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
} 