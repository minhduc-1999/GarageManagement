using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class QuotationDetail
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string QuotationId { get; set; }
        public string IssueName {get; set;}
        [BsonRepresentation(BsonType.ObjectId)]
        public string AccessoryId {get; set;}
        public int Quantity {get; set;}
        public double UnitPrice {get; set;}
        public string Unit {get; set;}
        [BsonRepresentation(BsonType.ObjectId)]
        public string LaborCostId {get; set;}
        public double Amount {get; set;}
    }
}