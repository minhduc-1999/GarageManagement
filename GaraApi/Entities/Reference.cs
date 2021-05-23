using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities{
    public class Reference{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get;set;}
        public string Name {get; set;}
        public string Type {get; set;}
        public string Value {get; set;}
    }
}