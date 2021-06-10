using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace GaraApi.Entities.Form
{
    public class AccessoryReceipt : Form
    {
        [BsonRequired]
        public double TotalAmount { get; set; }
        [BsonRequired]
        public AccessoryReceiptDetail[] Details { get; set; }
    }
}