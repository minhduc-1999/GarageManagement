using System;

using System.ComponentModel.DataAnnotations;
namespace GaraApi.Models
{
    public class AccessoryInputModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string Unit { get; set; }
        [Required]
        public double ReceiptPrice { get; set; }
        [Required]
        public int ExpiredTime { get; set; }
        [Required]
        public string ProviderId { get; set; }
        [Required]
        public string AccessoryTypeId { get; set; }
        public string Description { get; set; }

    }
}