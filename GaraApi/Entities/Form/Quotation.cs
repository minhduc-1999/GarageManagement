using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class Quotation : Form
    {
        [BsonRequired]
        public double TotalAmount { get; set; }

        public string State { get; set; }
        //[BsonRepresentation(MongoDB.Bson.BsonType.Array)]
        
        public List<Dictionary<string,QuotationDetail>> Details { get; set; }
    }
}