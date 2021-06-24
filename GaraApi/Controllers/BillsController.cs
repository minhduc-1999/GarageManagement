
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
        private readonly AccessoryService _accSer;

        public BillsController(BillService billService, AccessoryService accSer)
        {
            _billService = billService;
            _accSer = accSer;
        }

        [HttpGet]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<Bill>> Get() =>
            _billService.Get();

        [HttpGet("all")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<object> GetFull()
        {

            var bills = _billService.Get();
            var result = new List<object>();
            Dictionary<string, string> accMap = new Dictionary<string, string>();
            foreach (var bill in bills)
            {
                foreach (var detail in bill.Details)
                {
                    var accName = _accSer.Get(detail.AccessoryId).Name;
                    accMap.Add(detail.AccessoryId, accName);
                }
            }
            var obj = new { list = bills, attach = accMap };
            return obj;
        }

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
        [Authorize("admin, manager")]
        public ActionResult<List<Object>> GetReport([FromQuery] string option, [FromQuery] int year, [FromQuery] int month)
        {
            IEnumerable<Object> res = null;
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
            return new List<Object>(res);
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