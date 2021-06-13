
using System.Collections.Generic;
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

    public class RepairedRequestsController : ControllerBase
    {
        private readonly RepairedRequestService _repReqService;

        public RepairedRequestsController(RepairedRequestService repReqService)
        {
            _repReqService = repReqService;
        }

        [HttpGet]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<RepairedRequest>> Get() =>
            _repReqService.Get();

        [HttpGet("{id:length(24)}", Name = "GetRepairedRequest")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<RepairedRequest> Get(string id)
        {
            var repReq = _repReqService.Get(id);

            if (repReq == null)
            {
                return NotFound();
            }

            return repReq;
        }

        [HttpPost]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<RepairedRequest> Create([FromBody] RepairedRequestModel repairedRequestModel)
        {
            var userId = (HttpContext.Items["User"] as User).Id;
            var id = _repReqService.Create(userId,repairedRequestModel);

            return CreatedAtRoute("GetRepairedRequest", new { id = id}, id);
            
        }

        [HttpPut]
        [Authorize("admin, manager, receptionist")]
        public bool Update([FromBody] RepairedRequestUpdateModel repReqUpdateIn)
        {
            var repReq = _repReqService.Get(repReqUpdateIn.Id);
            
            if (repReq == null)
            {
                return false;
            }
            return _repReqService.Update(repReq, repReqUpdateIn);
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin, manager")]
        public IActionResult Delete(string id)
        {
            var repReq = _repReqService.Get(id);

            if (repReq == null)
            {
                return NotFound();
            }

            _repReqService.Remove(repReq.Id);

            return NoContent();
        }
    }
}