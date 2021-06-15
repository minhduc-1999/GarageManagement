
using System;
using System.Collections.Generic;
using garaapi.Models.ReportModel;
using garaapi.Services.ReportService;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly BillService _billService;

        public BillsController(BillService billService)
        {
            _billService = billService;
        }

        [HttpGet]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<Bill>> Get() =>
            _billService.Get();

        [HttpGet("{id:length(24)}", Name = "GetBill")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<Bill> Get(string id)
        {
            var bill = _billService.Get(id);

            if (bill == null)
            {
                return NotFound();
            }

            return bill;
        }

        [HttpPost]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<Bill> Create([FromBody] BillCreatedModel billModel)
        {
            var creator = (HttpContext.Items["User"] as User).UserClaims;
            var res = _billService.Create(creator, billModel);
            if (res.Item1 != 200)
            {
                return StatusCode(res.Item1, res.Item2);
            }
            return CreatedAtRoute("GetBill", new { id = res.Item3.Id.ToString() }, res.Item3);
        }

        [HttpGet("/api/report/revenue")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<ReportElement>> GetReport([FromQuery] string option, [FromQuery] int year, [FromQuery] int month)
        {
            IEnumerable<ReportElement> res = null;
            if (option == "annual")
            {
                res = _billService.Accept(new AnnualReportVisitor(new DateTime(year, 1, 1), new DateTime(year + 1, 1, 1)));
            }

            if (option == "monthly")
            {
                int endMonth = month + 1;
                int endYear = year;
                if (month == 12)
                {
                    endMonth = 1;
                    endYear++;
                }
                res = _billService.Accept(new MonthlyReportVisitor(new DateTime(year, month, 1), new DateTime(endYear, endMonth, 1)));
            }

            if (res == null)
                return BadRequest();
            return new List<ReportElement>(res);
        }

        // [HttpPut("{id:length(24)}")]
        // [Authorize("admin")]
        // public IActionResult Update(string id, Bill billIn)
        // {
        //     var bill = _billService.Get(id);

        //     if (bill == null)
        //     {
        //         return NotFound();
        //     }

        //     _billService.Update(id, billIn);

        //     return NoContent();
        // }

        // [HttpDelete("{id:length(24)}")]
        // [Authorize("admin")]
        // public IActionResult Delete(string id)
        // {
        //     var bill = _billService.Get(id);

        //     if (bill == null)
        //     {
        //         return NotFound();
        //     }

        //     _billService.Remove(bill.Id);

        //     return NoContent();
        // }
    }
}