using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

using System.ComponentModel.DataAnnotations;
using GaraApi.Entities.Form;
using System.Text.Json.Serialization;

namespace GaraApi.Entities
{
    public class Quotation
    {
        public enum QuotationtState {confirmed,not_confirmed}
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public QuotationtState State { get; set; }
        
        [Required]
        public List<QuotationDetail> Details { get; set; }
       
    }
}