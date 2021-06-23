using System;

namespace GaraApi.Models.AccessoryReceiptModel
{
    public class ReceiptDetailsModel
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public string ProviderName { get; set; }
        public string TypeName { get; set; }
        public string Unit { get; set; }
        public DateTime DateExpired { get; set; }
    }
}