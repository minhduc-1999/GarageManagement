using System;
using System.Collections.Generic;
using garaapi.Models.ReportModel;

namespace garaapi.Interfaces.Report
{
    public interface IReportService
    {
        IEnumerable<Object> Accept(IReportVisitor visitor);
    }
}