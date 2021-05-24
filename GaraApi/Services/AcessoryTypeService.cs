using System.Collections.Generic;
using GaraApi.Entities;

using MongoDB.Driver;

namespace GaraApi.Services
{
    public class AccessoryTypeService
    {
        private readonly IMongoCollection<AccessoryType> _accessoryType;

        public AccessoryTypeService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryType = database.GetCollection<AccessoryType>(settings.AccessoryTypeCollectionName);
        }

        public List<AccessoryType> Get() =>
            _accessoryType.Find(AccessoryType => true).ToList();

        public AccessoryType Get(string id) =>
            _accessoryType.Find<AccessoryType>(AccessoryType => AccessoryType.Id == id).FirstOrDefault();

        public AccessoryType Create(AccessoryType AccessoryType)
        {
            _accessoryType.InsertOne(AccessoryType);
            return AccessoryType;
        }

        public void Update(string id, AccessoryType AccessoryTypeIn) =>
            _accessoryType.ReplaceOne(AccessoryType => AccessoryType.Id == id, AccessoryTypeIn);

        public void Remove(AccessoryType AccessoryTypeIn) =>
            _accessoryType.DeleteOne(AccessoryType => AccessoryType.Id == AccessoryTypeIn.Id);

        public void Remove(string id) =>
            _accessoryType.DeleteOne(AccessoryType => AccessoryType.Id == id);
    }
}