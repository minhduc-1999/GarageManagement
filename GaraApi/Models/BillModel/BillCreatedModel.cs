using System;

using System.ComponentModel.DataAnnotations;
namespace GaraApi.Models
{
    public class BillCreatedModel
    {
        public double Discount { get; set; }
        public double VAT { get; set; }
        [Required]
        public string RepairedRequestId { get; set; }
        [Required]
        public string CustomerId { get; set; }

    }
}