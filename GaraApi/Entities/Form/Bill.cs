using System.Collections.Generic;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace GaraApi.Entities.Form
{
    public class Bill : Form
    {
        public enum BillState { unpaid, paid }

        [BsonIgnoreIfNull]
        public List<QuotationDetail> Details { get; set; }
        [BsonIgnoreIfDefault]
        public double Discount { get; set; }
        [BsonRequired]
        public double TotalAmount { get; set; }
        [BsonIgnoreIfDefault]
        public double VAT { get; set; }
        [BsonRequired]
        public Customer Customer { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public BillState State { get; set; } = BillState.unpaid;

    }
}