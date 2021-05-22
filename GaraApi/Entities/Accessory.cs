using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities
{
    public class Accessory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Brand { get; set; }

        public int Quantity { get; set; }

        public string Unit { get; set; }
        public double ReceipPrice { get; set; }
        public double IssuePrice { get; set; }
        [BsonRepresentation(BsonType.DateTime)]
        [BsonDateTimeOptions(DateOnly = true)]
        public DateTime ExpiredDate { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProviderId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AccessoryTypeId { get; set; }
        public string Description { get; set; }

    }
}