using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using GaraApi.Entities;

namespace GaraApi.Models
{
    public class AccessoryReceiptModel
    {
        [Required]
        public List<AccessoryInputModel> InputAccessories { get; set; }
        [Required]
        public string UserId { get; set; }

    }
}