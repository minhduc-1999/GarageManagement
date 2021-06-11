
using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotationsController : ControllerBase
    {
        private readonly QuotationService _quotationService;

        public QuotationsController(QuotationService quotationService)
        {
            _quotationService = quotationService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<List<Quotation>> Get() =>
            _quotationService.Get();

        [HttpGet("{id:length(24)}", Name = "GetQuotation")]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<Quotation> Get(string id)
        {
            var quotation = _quotationService.Get(id);

            if (quotation == null)
            {
                return NotFound();
            }

            return quotation;
        }

        [HttpPost]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<Quotation> Create([FromBody] List<QuotationDetail> details)
        {
            var userId = (HttpContext.Items["User"] as User).Id;
            
            var id = _quotationService.Create(userId,details);
            return CreatedAtRoute("GetQuotation", new { id = id }, id);
        }
        //     public async Task<IActionResult> Create([FromBody] Quotation quotation)
        // {
        //     await _quotationService.Create(quotation);

        //     return CreatedAtAction("GetQuotation", new { id = quotation.Id.ToString() }, quotation);
        // }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin, manager, receptionist")]
        public IActionResult Update(string id, Quotation quotationIn)
        {
            var quotation = _quotationService.Get(id);

            if (quotation == null)
            {
                return NotFound();
            }

            _quotationService.Update(id, quotationIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin, manager")]
        public IActionResult Delete(string id)
        {
            var quotation = _quotationService.Get(id);

            if (quotation == null)
            {
                return NotFound();
            }

            _quotationService.Remove(quotation.Id);

            return NoContent();
        }
    }
}