using garaapi.Interfaces.Report;
using garaapi.Models.ReportModel;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryIssueService : IReportService
    {
        private readonly IMongoCollection<AccessoryIssue> _accessoryIssue;
        private readonly AccessoryService _accessoryService;

        private readonly RepairedRequestService _rrService;

        public AccessoryIssueService(IGaraDatabaseSettings settings, RepairedRequestService rrService, AccessoryService accessoryService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryIssue = database.GetCollection<AccessoryIssue>(settings.AccessoryIssueCollectionName);

            _rrService = rrService;
            _accessoryService = accessoryService;
        }

        public List<AccessoryIssue> Get() =>
            _accessoryIssue.Find(accessoryIssue => true).ToList();

        public AccessoryIssue Get(string id) =>
            _accessoryIssue.Find<AccessoryIssue>(accessoryIssue => accessoryIssue.Id == id).FirstOrDefault();

        public AccessoryIssue Create(UserClaim creator, AccessoryIssue accessoryIssue)
        {
            var rrForm = _rrService.Get(accessoryIssue.RepairedRequestId);
            if (rrForm == null)
            {
                throw new Exception("Không tìm thấy phiếu sửa chữa");
            }
            if (rrForm.Quotation.State != Quotation.QuotationtState.confirmed)
                throw new Exception("Phiếu báo giá chưa được xác nhận");
            try
            {
                foreach (var detail in rrForm.Quotation.Details)
                {
                    var r = _accessoryService.Take(detail.AccessoryId, detail.Quantity);
                    if (r < 0)
                        return null;
                }
            }
            catch (Exception e)
            {
                throw e;
            }


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

        public IEnumerable<Object> Accept(IReportVisitor visitor)
        {
            return visitor.ExportAccessoryIssueReport(this._accessoryIssue);
        }

        // public void Update(string id, AccessoryIssue accessoryIssueIn) =>
        //     _accessoryIssue.ReplaceOne(accessoryIssue => accessoryIssue.Id == id, accessoryIssueIn);

        // public void Remove(AccessoryIssue accessoryIssueIn) =>
        //     _accessoryIssue.DeleteOne(accessoryIssue => accessoryIssue.Id == accessoryIssueIn.Id);

        // public void Remove(string id) =>
        //     _accessoryIssue.DeleteOne(accessoryIssue => accessoryIssue.Id == id);
    }
}