using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class Form
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedDate
        { get; set; }

    }
}