using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Technico.Models;

public class Repair
{
    public Guid RepairId { get; set; }
    public DateTime ScheduledDate { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public decimal Cost { get; set; }
    [ForeignKey("PropertyItem")]
    public Guid PropertyItemId { get; set; }
}
