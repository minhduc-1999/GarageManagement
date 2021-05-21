
using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Services;
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
        public ActionResult<List<Quotation>> Get() =>
            _quotationService.Get();

        [HttpGet("{id:length(24)}", Name = "GetQuotation")]
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
        public ActionResult<Quotation> Create([FromForm] Quotation quotation)
        {
            _quotationService.Create(quotation);

            return CreatedAtRoute("GetQuotation", new { id = quotation.Id.ToString() }, quotation);
        }

        [HttpPut("{id:length(24)}")]
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