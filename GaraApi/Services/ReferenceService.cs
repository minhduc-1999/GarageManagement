using System.Collections.Generic;
using GaraApi.Entities;

using MongoDB.Driver;

namespace GaraApi.Services
{
    public class ReferenceService
    {
        private readonly IMongoCollection<Reference> _reference;

        public ReferenceService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _reference = database.GetCollection<Reference>(settings.ReferenceCollectionName);
        }

        public List<Reference> Get() =>
            _reference.Find(Reference => true).ToList();

        public Reference Get(string id) =>
            _reference.Find<Reference>(Reference => Reference.Id == id).FirstOrDefault();

        // public Reference Create(Reference Reference)
        // {
        //     _reference.InsertOne(Reference);
        //     return Reference;
        // }

        public void Update(string id, Reference ReferenceIn) =>
            _reference.ReplaceOne(Reference => Reference.Id == id, ReferenceIn);

        // public void Remove(Reference ReferenceIn) =>
        //     _reference.DeleteOne(Reference => Reference.Id == ReferenceIn.Id);

        // public void Remove(string id) =>
        //     _reference.DeleteOne(Reference => Reference.Id == id);
    }
}