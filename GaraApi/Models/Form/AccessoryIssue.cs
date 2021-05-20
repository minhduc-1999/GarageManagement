using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Models.Form
{
    public class AccessoryIssue
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string QuotationId { get; set; }
    }
}