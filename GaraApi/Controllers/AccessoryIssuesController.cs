using System.Collections.Generic;
using garaapi.Models.ReportModel;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using garaapi.Services.ReportService;
using GaraApi.Models.AccessoryIssueModel;

namespace GaraApi.Controllers
{
    [Route("api/accessory-issues")]
    [ApiController]
    public class AccessoryIssuesController : ControllerBase
    {
        private readonly AccessoryIssueService _accIssueService;
        private readonly RepairedRequestService _rrService;
        private readonly AccessoryService _accessoryService;

        public AccessoryIssuesController(AccessoryIssueService accIssueService, RepairedRequestService rrService, AccessoryService accessoryService)
        {
            _accIssueService = accIssueService;
            _rrService = rrService;
            _accessoryService = accessoryService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<List<AccessoryIssue>> Get() =>
            _accIssueService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessoryIssue")]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<AccessoryIssue> Get(string id)
        {
            var accIssue = _accIssueService.Get(id);

            if (accIssue == null)
            {
                return NotFound();
            }

            return accIssue;
        }
        [HttpGet("/api/report/accessory-issue")]
        [Authorize("admin, manager")]
        public ActionResult<List<Object>> GetReport([FromQuery] string option, [FromQuery] int year, [FromQuery] int month)
        {
            IEnumerable<Object> res = null;
            switch (option)
            {
                case "annual":
                    res = _accIssueService.Accept(new AnnualReportVisitor(new DateTime(year, 1, 1), new DateTime(year + 1, 1, 1), _rrService, _accessoryService));
                    break;
                case "monthly":
                    int endMonth = month + 1;
                    int endYear = year;
                    if (month == 12)
                    {
                        endMonth = 1;
                        endYear++;
                    }
                    res = _accIssueService.Accept(new MonthlyReportVisitor(new DateTime(year, month, 1), new DateTime(endYear, endMonth, 1), _rrService, _accessoryService));
                    break;
                default:
                    break;
            }

            return new List<Object>(res);
        }
        // [HttpGet("/api/test")]
        // [Authorize("admin, manager")]
        // public ActionResult<List<Object>> GetReportTest()
        // {
        //     var res = _accIssueService.Get()
        //     return BadRequest();
        // }
        [HttpPost]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<AccessoryIssue> Create([FromBody] AccessoryIssue accIssue)
        {
            var creator = (HttpContext.Items["User"] as User).UserClaims;

            try
            {
                var res = _accIssueService.Create(creator, accIssue);
                if (res == null)
                {
                    return StatusCode(500);
                }
                return CreatedAtRoute("GetAccessoryIssue", new { id = res.Id.ToString() }, res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }


        }

        [HttpGet("details/{id:length(24)}", Name = "GetIssueDetail")]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<List<IssueDetailModel>> GetIssueDetails(string id)
        {
            try
            {
                var res = _accIssueService.GetIssueDetails(id);

                return res;
            }
            catch (Exception e)
            {
                return StatusCode(404, e.Message);
            }

        }

        // [HttpPut("{id:length(24)}")]
        // [Authorize("admin")]
        // public IActionResult Update(string id, AccessoryIssue accIssueIn)
        // {
        //     var accIssue = _accIssueService.Get(id);

        //     if (accIssue == null)
        //     {
        //         return NotFound();
        //     }

        //     _accIssueService.Update(id, accIssueIn);

        //     return NoContent();
        // }

        // [HttpDelete("{id:length(24)}")]
        // [Authorize("admin")]
        // public IActionResult Delete(string id)
        // {
        //     var accIssue = _accIssueService.Get(id);

        //     if (accIssue == null)
        //     {
        //         return NotFound();
        //     }

        //     _accIssueService.Remove(accIssue.Id);

        //     return NoContent();
        // }
    }
}