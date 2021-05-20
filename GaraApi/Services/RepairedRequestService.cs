using GaraApi.Models;
using GaraApi.Models.Form;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class RepairedRequestService
    {
        private readonly IMongoCollection<RepairedRequest> _repairedRequest;

        public RepairedRequestService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _repairedRequest = database.GetCollection<RepairedRequest>(settings.RepairedRequestCollectionName);
        }

        public List<RepairedRequest> Get() =>
            _repairedRequest.Find(repairedRequest => true).ToList();

        public RepairedRequest Get(string id) =>
            _repairedRequest.Find<RepairedRequest>(repairedRequest => repairedRequest.Id == id).FirstOrDefault();

        public RepairedRequest Create(RepairedRequest repairedRequest)
        {
            _repairedRequest.InsertOne(repairedRequest);
            return repairedRequest;
        }

        public void Update(string id, RepairedRequest repairedRequestIn) =>
            _repairedRequest.ReplaceOne(repairedRequest => repairedRequest.Id == id, repairedRequestIn);

        public void Remove(RepairedRequest repairedRequestIn) =>
            _repairedRequest.DeleteOne(repairedRequest => repairedRequest.Id == repairedRequestIn.Id);

        public void Remove(string id) =>
            _repairedRequest.DeleteOne(repairedRequest => repairedRequest.Id == id);
    }
}