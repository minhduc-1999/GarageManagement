using System;
namespace garaapi.Models.ReportModel{
    public class AccessoryIssueModel{
        public DateTime CreatedDate{get; set;}
        public string Name{get; set;}
        public double IssuePrice{get; set;}

        public string ProviderName{get; set;}

        public int Quantity{get; set;}

        public AccessoryIssueModel(DateTime createDate, string name, double issuePrice, string providerName, int quantity){
            CreatedDate = createDate;
            Name = name;
            IssuePrice = issuePrice;
            ProviderName = providerName;
            Quantity = quantity;
        }
        AccessoryIssueModel(){}
        
    }
}