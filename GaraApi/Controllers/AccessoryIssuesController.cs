using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoryIssuesController : ControllerBase
    {
        private readonly AccessoryIssueService _accIssueService;

        public AccessoryIssuesController(AccessoryIssueService accIssueService)
        {
            _accIssueService = accIssueService;
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

        [HttpPost]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<AccessoryIssue> Create([FromForm] AccessoryIssue accIssue)
        {
            _accIssueService.Create(accIssue);

            return CreatedAtRoute("GetAccessoryIssue", new { id = accIssue.Id.ToString() }, accIssue);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Update(string id, AccessoryIssue accIssueIn)
        {
            var accIssue = _accIssueService.Get(id);

            if (accIssue == null)
            {
                return NotFound();
            }

            _accIssueService.Update(id, accIssueIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Delete(string id)
        {
            var accIssue = _accIssueService.Get(id);

            if (accIssue == null)
            {
                return NotFound();
            }

            _accIssueService.Remove(accIssue.Id);

            return NoContent();
        }
    }
}