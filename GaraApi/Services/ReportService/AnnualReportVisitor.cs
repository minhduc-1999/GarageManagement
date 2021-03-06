using System;
using System.Collections.Generic;
using System.Linq;
using garaapi.Interfaces.Report;
using garaapi.Models.ReportModel;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Services;
using MongoDB.Driver;

namespace garaapi.Services.ReportService
{
    public class AnnualReportVisitor : BaseReportVisitor
    {
        private readonly RepairedRequestService _rrService;
        private readonly AccessoryService _accessoryService;

        private readonly AccessoryReceiptService _accessoryReceiptService;

        public AnnualReportVisitor(DateTime start, DateTime end, RepairedRequestService rrService, AccessoryService accessoryService) : base(start, end)
        {
            _rrService = rrService;
            _accessoryService = accessoryService;
        }
        public AnnualReportVisitor(DateTime start, DateTime end, AccessoryReceiptService accessoryReceiptService, AccessoryService accessoryService) : base(start, end)
        {
            _accessoryReceiptService = accessoryReceiptService;
            _accessoryService = accessoryService;
        }
        public AnnualReportVisitor(DateTime start, DateTime end) : base(start, end)
        {

        }
        public override IEnumerable<AccessoryReceiptModel> ExportAccessoryReceiptReport(IMongoCollection<AccessoryReceipt> _accessoryReceipt)
        {
            List<AccessoryReceiptModel> res = new List<AccessoryReceiptModel>();
            List<Tuple<DateTime,string,int,string,double>> temp = new List<Tuple<DateTime,string,int,string,double>>();
            var accessoryReceiptFilterBuilder = Builders<AccessoryReceipt>.Filter;
            var accessoryReceiptFilter = accessoryReceiptFilterBuilder.Gte("CreatedDate", _start)
             & accessoryReceiptFilterBuilder.Lt("CreatedDate", _end);
            var dataAccessoryReceipt = _accessoryReceipt.Find(accessoryReceiptFilter)
            .ToList();
            foreach (var data in dataAccessoryReceipt){
                AccessoryReceiptDetail[] details = _accessoryReceiptService.GetDetails(data.Id);
                foreach (var accDetail in details){
                    temp.Add(new Tuple<DateTime,string,int,string,double>(data.CreatedDate,accDetail.AccessoryId,accDetail.Quantity
                    ,accDetail.Unit,accDetail.UnitPrice));
                }
            }
            foreach (var acc in temp){
                var dataAccessory = _accessoryService.Get(acc.Item2);
                AccessoryReceiptModel a = new AccessoryReceiptModel(acc.Item1,dataAccessory.Name,acc.Item3,acc.Item4,acc.Item5,dataAccessory.Provider.Name);
                res.Add(a);
            }
            return res;
        }
        public override IEnumerable<AccessoryIssueModel> ExportAccessoryIssueReport(IMongoCollection<AccessoryIssue> _accessoryIssue)
        {
            List<AccessoryIssueModel> res = new List<AccessoryIssueModel>();
            List<Tuple<DateTime,string,double,int>> temp = new List<Tuple<DateTime,string,double,int>>();
            var accessoryIssueFilterBuilder = Builders<AccessoryIssue>.Filter;
            var accessoryIssueFilter = accessoryIssueFilterBuilder.Gte("CreatedDate", _start)
             & accessoryIssueFilterBuilder.Lt("CreatedDate", _end);
            var dataRepairedRequestId = _accessoryIssue.Find(accessoryIssueFilter)
            .Project(a => new {a.CreatedDate, a.RepairedRequestId})
            .ToList();
            
            foreach (var data in dataRepairedRequestId){
                List<QuotationDetail> details = _rrService.GetQuotationDetails(data.RepairedRequestId);
                foreach(var quotationDetail in details){
                    temp.Add(new Tuple<DateTime, string, double, int>(data.CreatedDate,quotationDetail.AccessoryId,quotationDetail.UnitPrice,quotationDetail.Quantity));
                }
            }

            foreach (var accessory in temp){
                var dataAccessory = _accessoryService.Get(accessory.Item2);
                AccessoryIssueModel a = new AccessoryIssueModel(accessory.Item1,dataAccessory.Name,accessory.Item3,dataAccessory.Provider.Name,accessory.Item4);
                res.Add(a);
            }
            return res;
        }

        public override IEnumerable<ReportElement> ExportCustomerReport(IMongoCollection<Customer> _customers)
        {
            var filterBuilder = Builders<Customer>.Filter;
            var filter = filterBuilder.Gte("CreatedDate", _start)
             & filterBuilder.Lt("CreatedDate", _end);
            var data = _customers.Find(filter)
            .Project(cus => cus.CreatedDate)
            .ToList()
            .GroupBy(time => time.Month).Select(group => new ReportElement()
            {
                Label = group.Key.ToString(),
                Value = group.Count()
            });
            return data;
        }

        public override IEnumerable<ReportElement> ExportRevenueReport(IMongoCollection<Bill> _bills)
        {
            var filterBuilder = Builders<Bill>.Filter;
            var filter = filterBuilder.Gte("CreatedDate", _start)
             & filterBuilder.Lt("CreatedDate", _end);
            var data = _bills.Find(filter)
            .Project(bill => new { bill.CreatedDate, bill.TotalAmount })
            .ToList()
            .GroupBy(item => item.CreatedDate.Month).Select(group => new ReportElement()
            {
                Label = group.Key.ToString(),
                Value = group.Sum(item => item.TotalAmount)
            });
            return data;
        }

       

        // public override IEnumerable<AccessoryIssueModel> ExportAccessoryIssueReport(IMongoCollection<RepairedRequest> _rrRequest,
        //  IMongoCollection<AccessoryIssue> _accessoryIssue, IMongoCollection<Accessory> _accessory,IMongoCollection<Provider> _provider)
        // {
        // List<Tuple<DateTime,String>> temp = new List<Tuple<DateTime, string>>(); // use to get datetime and accessoryId

        // // Get repaired request id which include accessory issue in year
        // var accessoryIssueFilterBuilder = Builders<AccessoryIssue>.Filter;
        // var accessoryIssueFilter = accessoryIssueFilterBuilder.Gte("CreatedDate", _start)
        //  & accessoryIssueFilterBuilder.Lt("CreatedDate", _end);
        // var dataRepairedRequestId = _accessoryIssue.Find(accessoryIssueFilter)
        //  .Project(a => new {a.CreatedDate, a.RepairedRequestId}).ToList();

        // // Get quotation details of repaired request
        // foreach (var data in dataRepairedRequestId){
        //     List<QuotationDetail> details = _rrService.GetQuotationDetails(data.RepairedRequestId);
        //     foreach(var quotationDetail in details){
        //         temp.Add(new Tuple<DateTime, string>(data.CreatedDate,quotationDetail.AccessoryId));
        //     }
        // }
        // foreach (var accessory in temp){

        //     // get accessory name, issue price, provider id
        //     //var accessoryFilterBuilder = Builders<Accessory>.Filter;
        //     //var accessoryFilter = accessoryFilterBuilder.Eq("Id", accessory.Item2);
        //     var dataAccessory = _accessory.Find(acc => acc.Id == accessory.Item2)
        //     .Project(a => new {accessory.Item1,a.Name, a.IssuePrice, a.Provider}).ToList();

        //     // get provider name
        //     var providerFilterBuilder = Builders<Provider>.Filter;
        //     var providerFilter = providerFilterBuilder.Eq("Id",dataAccessory[0].Provider);
        //     var dataProvider = _provider.Find(providerFilter)
        //     .Project(provider => new {dataAccessory[0].Item1,dataAccessory[0].Name,dataAccessory[0].IssuePrice,provider.Name}).ToList();

        //     //res.Add(new AccessoryIssueModel(accessory.Item1,dataAccessory[0].Name,dataAccessory[0].IssuePrice,dataProvider[0].Name));

        // }

    }
}
