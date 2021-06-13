using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

using System.ComponentModel.DataAnnotations;

namespace GaraApi.Entities.Form
{
    public class Quotation : Form
    {
        [BsonRequired]
        public double TotalAmount { get; set; }
        public string State { get; set; }
        
        [BsonRequired]
        public List<QuotationDetail> Details { get; set; }
       
    }
}