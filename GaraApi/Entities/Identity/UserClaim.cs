using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Identity
{
    public class UserClaim
    {
        [BsonIgnoreIfNull]
        public string PhoneNumber { get; set; }
        [BsonIgnoreIfNull]
        public string Email { get; set; }
        [BsonDateTimeOptions(DateOnly = true)]
        [BsonIgnoreIfNull]
        [BsonIgnoreIfDefault]
        public DateTime? DateOB { get; set; }

        [BsonIgnoreIfNull]
        public string FirstName { get; set; }
        [BsonIgnoreIfNull]
        public string LastName { get; set; }

        [BsonIgnoreIfNull]
        public string AvatarUrl { get; set; }

    }
}