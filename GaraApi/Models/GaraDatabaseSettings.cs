namespace GaraApi.Models
{
    public class GaraDatabaseSettings : IGaraDatabaseSettings
    {
        public string CustomerCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string AccessoryCollectionName { get; set; }
    }

    public interface IGaraDatabaseSettings
    {
        string CustomerCollectionName { get; set; }
        string AccessoryCollectionName { get; set; }

        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}