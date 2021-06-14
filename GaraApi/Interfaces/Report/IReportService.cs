using System.Collections.Generic;
using garaapi.Models.ReportModel;

namespace garaapi.Interfaces.Report
{
    public interface IReportService
    {
        IEnumerable<ReportElement> Accept(IReportVisitor visitor);
    }
}