using GymMaster.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymMaster.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService adminService;
        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }
        [HttpGet]
        public async Task<IActionResult> GetMonthlyRevenue()
        {
            var monthlyRevenue = await adminService.GetMonthlyRevenueAsync();
            return Ok(monthlyRevenue);
        }

    }
}
