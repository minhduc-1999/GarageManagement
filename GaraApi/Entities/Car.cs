using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities
{
    public class Car
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}
        public string Brand {get; set;}
        public string NumberPlate {get; set;}
        public string VIN{get; set;}
        public double DistanceTravelled {get; set;}
        [BsonRepresentation(BsonType.ObjectId)]
        public string RegisterId {get; set;}
        public string Owner {get; set;}
        public string Model {get; set;}



    }


}