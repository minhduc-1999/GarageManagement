using System;
using System.Collections.Generic;
using garaapi.Interfaces.Report;
using garaapi.Models.ReportModel;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using MongoDB.Driver;

namespace garaapi.Services.ReportService
{
    public abstract class BaseReportVisitor : IReportVisitor
    {
        protected DateTime _start;
        protected DateTime _end;
        public BaseReportVisitor(DateTime start, DateTime end)
        {
            _start = start;
            _end = end;
        }

        public abstract IEnumerable<AccessoryIssueModel> ExportAccessoryIssueReport(IMongoCollection<AccessoryIssue> _accessoryIssue);


        public abstract IEnumerable<ReportElement> ExportCustomerReport(IMongoCollection<Customer> _customers);

        public abstract IEnumerable<ReportElement> ExportRevenueReport(IMongoCollection<Bill> _bills);

        // public abstract IEnumerable<AccessoryIssueModel> ExportAccessoryIssueReport(IMongoCollection<RepairedRequest> _rrRequest
        // , IMongoCollection<AccessoryIssue> _accessoryIssue, IMongoCollection<Accessory> _accessory, IMongoCollection<Provider> _provider );
    
    }
}