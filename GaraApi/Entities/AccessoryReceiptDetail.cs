using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities{
    public class AccessoryReceiptDetail{
        public int Quantity{get; set;}
        public double UnitPrice {get; set;}
        public string Unit {get; set;}
        public int Amount {get; set;}
        [BsonRepresentation(BsonType.ObjectId)]
        public string AccessoryReceiptId {get; set;}
        [BsonRepresentation(BsonType.ObjectId)]
        public string AccessoryId {get; set;}
    }
}