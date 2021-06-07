using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities
{
    public class Car
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Brand {get; set;}
        [BsonRequired]
        public string NumberPlate {get; set;}
        [BsonRequired]
        public string VIN{get; set;}
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public double DistanceTravelled {get; set;}
        [BsonRequired]
        public string RegisterId {get; set;}
        [BsonRequired]
        public string Owner {get; set;}
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Color {get; set;}
        [BsonIgnoreIfNull]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Model {get; set;}



    }


}