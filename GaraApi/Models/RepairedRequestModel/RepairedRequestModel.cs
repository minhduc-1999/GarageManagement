using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using GaraApi.Entities;
using GaraApi.Entities.Form;

namespace GaraApi.Models
{
    public class RepairedRequestModel
    {
        [Required]
        public string CarId { get; set; }
        [Required]
        public string CustomerId { get; set; }
        [Required]
        //public List<QuotationDetail> Details { get; set; }
        public Quotation quotation {get; set;}
    }
}