using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Models.Form
{
    public class AccessoryIssue : Form
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string QuotationId { get; set; }
    }
}