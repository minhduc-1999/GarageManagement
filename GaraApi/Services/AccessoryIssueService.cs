using GaraApi.Models;
using GaraApi.Models.Form;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryIssueService
    {
        private readonly IMongoCollection<AccessoryIssue> _accessoryIssue;

        public AccessoryIssueService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryIssue = database.GetCollection<AccessoryIssue>(settings.AccessoryIssueCollectionName);
        }

        public List<AccessoryIssue> Get() =>
            _accessoryIssue.Find(accessoryIssue => true).ToList();


        public AccessoryIssue Get(string id) =>
            _accessoryIssue.Find<AccessoryIssue>(accessoryIssue => accessoryIssue.Id == id).FirstOrDefault();

        public AccessoryIssue Create(AccessoryIssue accessoryIssue)
        {
            _accessoryIssue.InsertOne(accessoryIssue);
            return accessoryIssue;
        }

        public void Update(string id, AccessoryIssue accessoryIssueIn) =>
            _accessoryIssue.ReplaceOne(accessoryIssue => accessoryIssue.Id == id, accessoryIssueIn);

        public void Remove(AccessoryIssue accessoryIssueIn) =>
            _accessoryIssue.DeleteOne(accessoryIssue => accessoryIssue.Id == accessoryIssueIn.Id);

        public void Remove(string id) =>
            _accessoryIssue.DeleteOne(accessoryIssue => accessoryIssue.Id == id);
    }
}