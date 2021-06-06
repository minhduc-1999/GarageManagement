using System.Collections.Generic;
using GaraApi.Entities;

using MongoDB.Driver;

namespace GaraApi.Services
{
    public class ProviderService
    {
        private readonly IMongoCollection<Provider> _provider;

        public ProviderService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _provider = database.GetCollection<Provider>(settings.ProviderCollectionName);
        }

        public List<Provider> Get() =>
            _provider.Find(Provider => true).ToList();

        public Provider Get(string id) =>
            _provider.Find<Provider>(Provider => Provider.Id == id).FirstOrDefault();

        public Provider Create(Provider provider)
        {
            _provider.InsertOne(provider);
            return provider;
        }

        public void Update(string id, Provider ProviderIn) =>
            _provider.ReplaceOne(Provider => Provider.Id == id, ProviderIn);

        public void Remove(Provider ProviderIn) =>
            _provider.DeleteOne(Provider => Provider.Id == ProviderIn.Id);

        public void Remove(string id) =>
            _provider.DeleteOne(Provider => Provider.Id == id);
    }
}