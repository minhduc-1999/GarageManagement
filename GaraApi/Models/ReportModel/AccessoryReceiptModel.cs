using System;
namespace garaapi.Models.ReportModel{
    public class AccessoryReceiptModel{
        public DateTime CreatedDate{get; set;}
        public string Name{get; set;}
        public int Quantity{get; set;}
        public string Unit{get;set;}
        public double UnitPrice{get; set;}

        public string ProviderName{get; set;}
        
        public AccessoryReceiptModel(DateTime createDate, string name, int quantity, string unit, double unitPrice, string providerName){
            CreatedDate = createDate;
            Name = name;
            UnitPrice = unitPrice;
            ProviderName = providerName;
            Quantity = quantity;
            Unit = unit;
        }
        AccessoryReceiptModel(){}
        
    }
}