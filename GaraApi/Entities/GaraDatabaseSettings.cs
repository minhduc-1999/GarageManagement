namespace GaraApi.Entities
{
    public class GaraDatabaseSettings : IGaraDatabaseSettings
    {
        public string CustomerCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string AccessoryCollectionName { get; set; }
        public string QuotationCollectionName { get; set; }
        public string AccessoryIssueCollectionName { get; set; }
        public string AccessoryReceiptCollectionName { get; set; }
        public string BillCollectionName { get; set; }
        public string RepairedRequestCollectionName { get; set; }
        public string UserCollectionName { get; set; }
        public string UserRoleCollectionName { get; set; }
        public string CarCollectionName {get; set;}
        public string AccessoryReceiptDetailCollectionName { get; set; }
        public string AccessoryTypeCollectionName { get; set; }
        public string LaborCostCollectionName { get; set; }
        public string ProviderCollectionName { get; set; }
        public string QuotationDetailCollectionName { get; set; }
        public string ReferenceCollectionName { get; set; }
    }

    public interface IGaraDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string CustomerCollectionName { get; set; }
        string AccessoryCollectionName { get; set; }
        string QuotationCollectionName { get; set; }
        string AccessoryIssueCollectionName { get; set; }
        string AccessoryReceiptCollectionName { get; set; }
        string BillCollectionName { get; set; }
        string RepairedRequestCollectionName { get; set; }
        string UserCollectionName { get; set; }
        string UserRoleCollectionName { get; set; }
        string CarCollectionName {get; set;}
        string AccessoryReceiptDetailCollectionName { get; set; }
        string AccessoryTypeCollectionName { get; set; }
        string LaborCostCollectionName { get; set; }
        string ProviderCollectionName { get; set; }
        string QuotationDetailCollectionName { get; set; }
        string ReferenceCollectionName { get; set; }
    }
}