using GaraApi.Entities;
using MongoDB.Driver;
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
            _accessory.Find(accessory => true).ToList();


        public Accessory Get(string id) =>
            _accessory.Find<Accessory>(accessory => accessory.Id == id).FirstOrDefault();

        public Accessory Create(Accessory accessory)
        {
            _accessory.InsertOne(accessory);
            return accessory;
        }

        public void Update(string id, Accessory accessoryIn) =>
            _accessory.ReplaceOne(accessory => accessory.Id == id, accessoryIn);

        public void Remove(Accessory accessoryIn) =>
            _accessory.DeleteOne(accessory => accessory.Id == accessoryIn.Id);

        public void Remove(string id) =>
            _accessory.DeleteOne(accessory => accessory.Id == id);
    }
}