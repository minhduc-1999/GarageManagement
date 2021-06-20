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
        public AnnualReportVisitor(DateTime start, DateTime end) : base(start, end)
        {
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
    }
}