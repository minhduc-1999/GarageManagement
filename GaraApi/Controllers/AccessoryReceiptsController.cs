using System;
using System.Collections.Generic;
using garaapi.Services.ReportService;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/accessory-receipts")]
    [ApiController]
    public class AccessoryReceiptsController : ControllerBase
    {
        private readonly AccessoryReceiptService _accReceiptService;
        private readonly AccessoryService _accessoryService;

        public AccessoryReceiptsController(AccessoryReceiptService accReceiptService, AccessoryService accessoryService)
        {
            _accReceiptService = accReceiptService;
            _accessoryService = accessoryService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<List<AccessoryReceipt>> Get() =>
            _accReceiptService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessoryReceipt")]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<AccessoryReceipt> Get(string id)
        {
            var accReceipt = _accReceiptService.Get(id);

            if (accReceipt == null)
            {
                return NotFound();
            }

            return accReceipt;
        }
        [HttpGet("/api/report/accessory-receipt")]
        [Authorize("admin, manager")]
        public ActionResult<List<Object>> GetReport([FromQuery] string option, [FromQuery] int year, [FromQuery] int month)
        {
            IEnumerable<Object> res = null;
            switch (option)
            {
                case "annual":
                    res = _accReceiptService.Accept(new AnnualReportVisitor(new DateTime(year, 1, 1), new DateTime(year + 1, 1, 1), _accReceiptService, _accessoryService));
                    break;
                case "monthly":
                    int endMonth = month + 1;
                    int endYear = year;
                    if (month == 12)
                    {
                        endMonth = 1;
                        endYear++;
                    }
                    res = _accReceiptService.Accept(new MonthlyReportVisitor(new DateTime(year, month, 1), new DateTime(endYear, endMonth, 1), _accReceiptService, _accessoryService));
                    break;
                default:
                    break;
            }

            return new List<Object>(res);
        }
        [HttpPost]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<string> Create([FromBody] List<AccessoryInputModel> model)
        {
            var creator = (HttpContext.Items["User"] as User).UserClaims;
            var id = _accReceiptService.Create(creator, model);
            if (id == null)
                return StatusCode(500);
            return CreatedAtRoute("GetAccessoryReceipt", new { id = id }, id);
        }

        // [HttpPut("{id:length(24)}")]
        // [Authorize("admin")]
        // public IActionResult Update(string id, AccessoryReceipt accReceiptIn)
        // {
        //     var accReceipt = _accReceiptService.Get(id);

        //     if (accReceipt == null)
        //     {
        //         return NotFound();
        //     }

        //     _accReceiptService.Update(id, accReceiptIn);

        //     return NoContent();
        // }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Delete(string id)
        {
            var accReceipt = _accReceiptService.Get(id);

            if (accReceipt == null)
            {
                return NotFound();
            }

            _accReceiptService.Remove(accReceipt.Id);

            return NoContent();
        }
    }
}