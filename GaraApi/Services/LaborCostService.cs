using System.Collections.Generic;
using GaraApi.Entities;

using MongoDB.Driver;

namespace GaraApi.Services
{
    public class LaborCostService
    {
        private readonly IMongoCollection<LaborCost> _laborCost;

        public LaborCostService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _laborCost = database.GetCollection<LaborCost>(settings.LaborCostCollectionName);
        }

        public List<LaborCost> Get() =>
            _laborCost.Find(LaborCost => true).ToList();

        public LaborCost Get(string id) =>
            _laborCost.Find<LaborCost>(LaborCost => LaborCost.Id == id).FirstOrDefault();

        public LaborCost Create(LaborCost LaborCost)
        {
            _laborCost.InsertOne(LaborCost);
            return LaborCost;
        }

        public void Update(string id, LaborCost LaborCostIn) =>
            _laborCost.ReplaceOne(LaborCost => LaborCost.Id == id, LaborCostIn);

        public void Remove(LaborCost LaborCostIn) =>
            _laborCost.DeleteOne(LaborCost => LaborCost.Id == LaborCostIn.Id);

        public void Remove(string id) =>
            _laborCost.DeleteOne(LaborCost => LaborCost.Id == id);
    }
}