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

        public abstract IEnumerable<ReportElement> ExportCustomerReport(IMongoCollection<Customer> _customers);

        public abstract IEnumerable<ReportElement> ExportRevenueReport(IMongoCollection<Bill> _bills);
    }
}