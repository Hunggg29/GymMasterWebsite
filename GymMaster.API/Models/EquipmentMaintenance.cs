using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymMaster.API.Models
{
    public class EquipmentMaintenance
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string IssueDescription { get; set; }
        public string Status { get; set; }

        [Required]
        public int EquipmentId { get; set; }

        [ForeignKey("EquipmentId")]
        public Equipment Equipment { get; set; }
    }
}
