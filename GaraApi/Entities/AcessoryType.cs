using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities{
    public class AccessoryType{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}
        [BsonRequired]
        public string Name {get; set;}
    }
}