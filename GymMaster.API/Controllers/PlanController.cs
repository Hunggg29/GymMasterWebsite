using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GymMaster.API.Models;
using GymMaster.API.Services.Interfaces;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanController : ControllerBase
    {
        private readonly IPlanService _planService;

        public PlanController(IPlanService planService)
        {
            _planService = planService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPlans()
        {
            var plans = await _planService.GetAllPlansAsync();
            return Ok(plans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlanById(int id)
        {
            var plan = await _planService.GetPlanByIdAsync(id);
            if (plan == null)
                return NotFound();

            return Ok(plan);
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> CreatePlan([FromBody] Plan plan)
        {
            var createdPlan = await _planService.CreatePlanAsync(plan);
            return CreatedAtAction(nameof(GetPlanById), new { id = createdPlan.Id }, createdPlan);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlan(int id, [FromBody] Plan plan)
        {
            if (id != plan.Id)
                return BadRequest();

            var success = await _planService.UpdatePlanAsync(plan);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlan(int id)
        {
            var success = await _planService.DeletePlanAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [Authorize(Roles = "admin")]
        [HttpPatch("{id}/toggle")]
        public async Task<IActionResult> TogglePlanStatus(int id)
        {
            var success = await _planService.TogglePlanStatusAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
} 