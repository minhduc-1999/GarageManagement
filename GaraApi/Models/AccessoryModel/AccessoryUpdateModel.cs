using System;

using System.ComponentModel.DataAnnotations;
namespace GaraApi.Models
{
    public class AccessoryUpdateModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public double IssuePrice { get; set; }
        [Required]
        public string AccessoryTypeId { get; set; }
        public string Description { get; set; }

    }
}