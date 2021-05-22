using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Identity
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Username { get; set; }

        public string PasswordHash { get; set; }
        public int AccessFailCount { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string Role { get; set; }
        public UserClaim UserClaims { get; set; }
    }
}