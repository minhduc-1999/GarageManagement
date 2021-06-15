using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryIssueService
    {
        private readonly IMongoCollection<AccessoryIssue> _accessoryIssue;

        private readonly RepairedRequestService _rrService;

        public AccessoryIssueService(IGaraDatabaseSettings settings, RepairedRequestService rrService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryIssue = database.GetCollection<AccessoryIssue>(settings.AccessoryIssueCollectionName);

            _rrService = rrService;
        }

        public List<AccessoryIssue> Get() =>
            _accessoryIssue.Find(accessoryIssue => true).ToList();


        public AccessoryIssue Get(string id) =>
            _accessoryIssue.Find<AccessoryIssue>(accessoryIssue => accessoryIssue.Id == id).FirstOrDefault();

        public AccessoryIssue Create(UserClaim creator, AccessoryIssue accessoryIssue)
        {
            if (_rrService.GetQuotationtState(accessoryIssue.RepairedRequestId) != Quotation.QuotationtState.confirmed)
                return null;
            Console.WriteLine(_rrService.GetQuotationtState(accessoryIssue.RepairedRequestId));
            accessoryIssue.Creator = creator;
            accessoryIssue.CreatedDate = System.DateTime.Now;
            try
            {
                _accessoryIssue.InsertOne(accessoryIssue);
                return accessoryIssue;
            }
            catch
            {
                return null;
            }

        }

        // public void Update(string id, AccessoryIssue accessoryIssueIn) =>
        //     _accessoryIssue.ReplaceOne(accessoryIssue => accessoryIssue.Id == id, accessoryIssueIn);

        // public void Remove(AccessoryIssue accessoryIssueIn) =>
        //     _accessoryIssue.DeleteOne(accessoryIssue => accessoryIssue.Id == accessoryIssueIn.Id);

        // public void Remove(string id) =>
        //     _accessoryIssue.DeleteOne(accessoryIssue => accessoryIssue.Id == id);
    }
}