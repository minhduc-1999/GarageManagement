using System.Collections.Generic;
using System.Text.Json.Serialization;
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
        public enum RepairedRequestState {init,canceled,finished}

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public RepairedRequestState State { get; set; }
        [BsonRequired]
        public Quotation Quotation { get; set; }
        [BsonRequired]
        public double TotalAmount { get; set; }
    }
}