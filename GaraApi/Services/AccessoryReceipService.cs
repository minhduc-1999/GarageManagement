using GaraApi.Entities;
using GaraApi.Entities.Form;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryReceiptService
    {
        private readonly IMongoCollection<AccessoryReceipt> _accessoryReceipt;

        public AccessoryReceiptService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryReceipt = database.GetCollection<AccessoryReceipt>(settings.AccessoryReceiptCollectionName);
        }

        public List<AccessoryReceipt> Get() =>
            _accessoryReceipt.Find(accessoryReceipt => true).ToList();


        public AccessoryReceipt Get(string id) =>
            _accessoryReceipt.Find<AccessoryReceipt>(accessoryReceipt => accessoryReceipt.Id == id).FirstOrDefault();

        public AccessoryReceipt Create(AccessoryReceipt accessoryReceipt)
        {
            _accessoryReceipt.InsertOne(accessoryReceipt);
            return accessoryReceipt;
        }

        public void Update(string id, AccessoryReceipt accessoryReceiptIn) =>
            _accessoryReceipt.ReplaceOne(accessoryReceipt => accessoryReceipt.Id == id, accessoryReceiptIn);

        public void Remove(AccessoryReceipt accessoryReceiptIn) =>
            _accessoryReceipt.DeleteOne(accessoryReceipt => accessoryReceipt.Id == accessoryReceiptIn.Id);

        public void Remove(string id) =>
            _accessoryReceipt.DeleteOne(accessoryReceipt => accessoryReceipt.Id == id);
    }
}