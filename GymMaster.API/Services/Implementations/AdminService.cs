using GymMaster.API.Data;
using GymMaster.API.Models.DTO;
using GymMaster.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GymMaster.API.Services.Implementations
{
    public class AdminService : IAdminService
    {   
        private readonly ApplicationDbContext _context;

        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MonthlyRevenueDto>> GetMonthlyRevenueAsync()
        {
            var currentYear = DateTime.UtcNow.Year;
            
            var monthlyRevenue = await _context.Payment
                .Where(p => p.PaymentDate.Year == currentYear)
                .GroupBy(p => new { p.PaymentDate.Year, p.PaymentDate.Month })
                .Select(g => new MonthlyRevenueDto
                {
                    Year = g.Key.Year,
                    Month = g.Key.Month,
                    TotalAmount = g.Sum(p => p.Amount)
                })
                .OrderBy(r => r.Year)
                .ThenBy(r => r.Month)
                .ToListAsync();

            // Fill in missing months with zero amount
            var allMonths = Enumerable.Range(1, 12)
                .Select(month => new MonthlyRevenueDto
                {
                    Year = currentYear,
                    Month = month,
                    TotalAmount = monthlyRevenue
                        .FirstOrDefault(r => r.Month == month)?.TotalAmount ?? 0
                })
                .ToList();

            return allMonths;
        }
    }
}
