using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using MongoDB.Driver;

namespace GaraApi.Services
{
    public class BillService
    {
        private readonly IMongoCollection<Bill> _bill;

        public BillService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _bill = database.GetCollection<Bill>(settings.BillCollectionName);
        }

        public List<Bill> Get() =>
            _bill.Find(bill => true).ToList();

        public Bill Get(string id) =>
            _bill.Find<Bill>(bill => bill.Id == id).FirstOrDefault();

        public Bill Create(Bill bill)
        {
            _bill.InsertOne(bill);
            return bill;
        }

        public void Update(string id, Bill billIn) =>
            _bill.ReplaceOne(bill => bill.Id == id, billIn);

        public void Remove(Bill billIn) =>
            _bill.DeleteOne(bill => bill.Id == billIn.Id);

        public void Remove(string id) =>
            _bill.DeleteOne(bill => bill.Id == id);
    }
}