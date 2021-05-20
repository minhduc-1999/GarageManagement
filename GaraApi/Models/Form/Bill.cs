using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace GaraApi.Models.Form
{
    public class Bill
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string RepairedRequestId { get; set; }

        public double TotalAmount { get; set; }

    }
}