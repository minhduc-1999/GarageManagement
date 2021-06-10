using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities
{
    public class AccessoryReceiptDetail
    {
        [Required]
        [BsonRequired]
        public int Quantity { get; set; }
        [BsonRequired]
        [Required]
        public double UnitPrice { get; set; }
        [BsonRequired]
        [Required]
        public string Unit { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string AccessoryId { get; set; }
        [Required]
        [BsonRequired]
        public int ExpiredTime { get; set; }
    }
}