using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class RepairedRequest : Form
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string CarId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string CustomerId { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string AccessoryIssueId { get; set; }

        public string State { get; set; }
    }
}