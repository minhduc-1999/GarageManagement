using System;
using System.Collections.Generic;
using garaapi.Models.ReportModel;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Services;
using MongoDB.Driver;

namespace garaapi.Interfaces.Report
{
    public interface IReportVisitor
    {
        IEnumerable<ReportElement> ExportCustomerReport(IMongoCollection<Customer> _customers);
        IEnumerable<ReportElement> ExportRevenueReport(IMongoCollection<Bill> _bills);

    }
}