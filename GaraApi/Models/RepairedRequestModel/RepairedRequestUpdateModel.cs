using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using static GaraApi.Entities.Form.RepairedRequest;

namespace GaraApi.Models
{
    public class RepairedRequestUpdateModel
    {
        [Required]
        public string Id{get; set;}
        [Required]
        public string CarId { get; set; }
        [Required]
        public string CustomerId { get; set; }
        [Required]
        public Quotation quotation {get; set;}

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RepairedRequestState RRState { get; set; }
        

    }
}