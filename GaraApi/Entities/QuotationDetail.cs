using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace GaraApi.Entities
{
    public class QuotationDetail
    {
       // public string QuotationId { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string IssueName { get; set; }
        [BsonRequired]
        public string AccessoryId { get; set; }
        [BsonRequired]
        public int Quantity { get; set; }
        [BsonRequired]
        public double UnitPrice { get; set; }
        [BsonRequired]
        public double LaborCost { get; set; }
        public double Amount { get; set; }
    }
}