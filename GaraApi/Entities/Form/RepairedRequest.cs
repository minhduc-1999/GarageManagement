using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class RepairedRequest : Form
    {
        [BsonRequired]
        public string CarId { get; set; }
        [BsonRequired]
        public string CustomerId { get; set; }
        public string State { get; set; }
        [BsonRequired]
        public List<QuotationDetail> Details { get; set; }
        [BsonRequired]
        public double TotalAmount { get; set; }
    }
}