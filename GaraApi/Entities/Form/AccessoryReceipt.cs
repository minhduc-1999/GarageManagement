using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace GaraApi.Entities.Form
{
    public class AccessoryReceipt : Form
    {
        public int TotalAmount { get; set; }
        [BsonRepresentation(BsonType.Array)]
        public List<AccessoryReceiptDetail> Details { get; set; }
    }
}