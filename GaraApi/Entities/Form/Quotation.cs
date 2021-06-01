using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace GaraApi.Entities.Form
{
    public class Quotation : Form
    {
        public double TotalAmount { get; set; }

        public string State { get; set; }
        [BsonRepresentation(MongoDB.Bson.BsonType.Array)]
        public List<QuotationDetail> Details { get; set; }
    }
}