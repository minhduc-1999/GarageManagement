namespace GaraApi.Models
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
    }
}