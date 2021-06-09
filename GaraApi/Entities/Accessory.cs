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
        public int Quantity { get; set; }
        [BsonRequired]
        [Required]
        public string Unit { get; set; }
        public double ReceiptPrice { get; set; }
        public double IssuePrice { get; set; }
        [BsonRepresentation(BsonType.DateTime)]
        [BsonDateTimeOptions(DateOnly = true)]
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public DateTime ExpiredDate { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        [Required]
        public string ProviderId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        [Required]
        public string AccessoryTypeId { get; set; }
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Description { get; set; }

    }
}