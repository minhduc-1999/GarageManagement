using GaraApi.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryService
    {
        private readonly IMongoCollection<Accessory> _accessory;

        public AccessoryService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessory = database.GetCollection<Accessory>(settings.AccessoryCollectionName);
        }

        public List<Accessory> Get() =>
            _accessory.Find(accessory => accessory.Quantity > 0).ToList();


        public Accessory Get(string id) =>
            _accessory.Find<Accessory>(accessory => accessory.Id == id).FirstOrDefault();

        public Accessory Create(Accessory accessory)
        {
            try
            {
                _accessory.InsertOne(accessory);
                return accessory;
            }
            catch
            {
                return null;
            }

        }

        public List<Accessory> Create(List<Accessory> accessories)
        {
            try
            {
                _accessory.InsertMany(accessories);
                //var res = accessories.ConvertAll<string>(acc => acc.Id);
                return accessories;
            }
            catch
            {
                return null;
            }

        }

        public void Update(string id, Accessory accessoryIn) =>
            _accessory.ReplaceOne(accessory => accessory.Id == id, accessoryIn);

        public void Remove(Accessory accessoryIn) =>
            _accessory.DeleteOne(accessory => accessory.Id == accessoryIn.Id);

        public void Remove(string id) =>
            _accessory.DeleteOne(accessory => accessory.Id == id);

        public bool isExisted(string id)
        {
            var num = _accessory.CountDocuments(acc => acc.Id == id);
            if (num == 0)
                return false;
            return true;
        }

        public int Take(string id, int amount)
        {
            var acc = _accessory.Find(acc => acc.Id == id).Project(acc => new { acc.Quantity, acc.Name }).SingleOrDefault();
            if (acc.Quantity < amount)
                throw new Exception($"Số lượng {acc.Name} còn lại không đủ");
            var update = Builders<Accessory>.Update.Set("Quantity", acc.Quantity - amount);
            var res = _accessory.UpdateOne(acc => acc.Id == id, update);
            if (res.ModifiedCount >= 1)
            {
                return amount;
            }
            return -1;
        }
    }
}