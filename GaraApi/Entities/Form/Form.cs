using System;
using System.ComponentModel.DataAnnotations;
using GaraApi.Entities.Identity;
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
        [BsonRequired]
        public DateTime CreatedDate
        { get; set; }
        [BsonRequired]
        public UserClaim Creator { get; set; }
    }
}