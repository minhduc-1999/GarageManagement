using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities
{
    public class Accessory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        [Required]
        public string Name { get; set; }
        [Required]
        [BsonRequired]
        public int Quantity { get; set; } = 0;
        [BsonRequired]
        [Required]
        public string Unit { get; set; }
        [BsonRequired]
        [Required]
        public double ReceiptPrice { get; set; } = 0;
        [BsonIgnoreIfDefault]
        public double IssuePrice { get; set; } = 0;
        [BsonRepresentation(BsonType.DateTime)]
        [BsonRequired]
        public DateTime ExpiredDate { get; set; }
        [BsonRequired]
        [Required]
        public Provider Provider { get; set; }
        [BsonRequired]
        [Required]
        public AccessoryType AccessoryType { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Description { get; set; }

    }
}