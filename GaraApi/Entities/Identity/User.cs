using System.Collections.Generic;
using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Identity
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRequired]
        public string Username { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        [BsonRequired]
        public string PasswordHash { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        public int AccessFailCount { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        public bool IsLock { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public string Role { get; set; }
        [BsonIgnoreIfNull]
        public UserClaim UserClaims { get; set; }
    }
}