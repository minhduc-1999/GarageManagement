using GaraApi.Entities;
using GaraApi.Entities.Form;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryReceiptDetailService
    {
        private readonly IMongoCollection<AccessoryReceiptDetail> _accessoryReceiptDetail;

        public AccessoryReceiptDetailService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryReceiptDetail = database.GetCollection<AccessoryReceiptDetail>(settings.AccessoryReceiptDetailCollectionName);
        }

        public List<AccessoryReceiptDetail> Get() =>
            _accessoryReceiptDetail.Find(AccessoryReceiptDetail => true).ToList();


        public AccessoryReceiptDetail Get(string accessoryReceiptId, string accessoryId) =>
            _accessoryReceiptDetail.Find<AccessoryReceiptDetail>(AccessoryReceiptDetail => AccessoryReceiptDetail.AccessoryReceiptId == accessoryReceiptId 
            && AccessoryReceiptDetail.AccessoryId == accessoryId ).FirstOrDefault();

        public AccessoryReceiptDetail Create(AccessoryReceiptDetail accessoryReceiptDetail)
        {
            _accessoryReceiptDetail.InsertOne(accessoryReceiptDetail);
            return accessoryReceiptDetail;
        }

        public void Update(string accessoryReceiptId, string accessoryId, AccessoryReceiptDetail accessoryReceiptDetailIn) =>
            _accessoryReceiptDetail.ReplaceOne(AccessoryReceiptDetail => AccessoryReceiptDetail.AccessoryId == accessoryId 
            && AccessoryReceiptDetail.AccessoryReceiptId == accessoryReceiptId, accessoryReceiptDetailIn);

        public void Remove(AccessoryReceiptDetail accessoryReceiptDetailIn) =>
            _accessoryReceiptDetail.DeleteOne(AccessoryReceiptDetail => 
            AccessoryReceiptDetail.AccessoryId == accessoryReceiptDetailIn.AccessoryId 
            && AccessoryReceiptDetail.AccessoryReceiptId == accessoryReceiptDetailIn.AccessoryReceiptId);

        public void Remove(string accessoryReceiptId, string accessoryId) =>
            _accessoryReceiptDetail.DeleteOne(AccessoryReceiptDetail => AccessoryReceiptDetail.AccessoryId == accessoryId 
            && AccessoryReceiptDetail.AccessoryReceiptId == accessoryReceiptId);
    }
}