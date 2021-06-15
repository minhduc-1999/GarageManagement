using System.Collections.Generic;
using System.Text.Json.Serialization;
using GaraApi.Entities.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class AccessoryIssue : Form
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [System.ComponentModel.DataAnnotations.Required]
        public string RepairedRequestId { get; set; }
        [BsonRequired]
        [System.ComponentModel.DataAnnotations.Required]
        public string Receiver { get; set; }
    }
}

