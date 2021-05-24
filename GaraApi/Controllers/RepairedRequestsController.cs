
using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Services;
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
        public ActionResult<List<RepairedRequest>> Get() =>
            _repReqService.Get();

        [HttpGet("{id:length(24)}", Name = "GetRepairedRequest")]
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
        public ActionResult<RepairedRequest> Create([FromForm] RepairedRequest repReq)
        {
            _repReqService.Create(repReq);

            return CreatedAtRoute("GetRepairedRequest", new { id = repReq.Id.ToString() }, repReq);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, RepairedRequest repReqIn)
        {
            var repReq = _repReqService.Get(id);

            if (repReq == null)
            {
                return NotFound();
            }

            _repReqService.Update(id, repReqIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
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