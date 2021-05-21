
using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Services;
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
        public ActionResult<List<Bill>> Get() =>
            _billService.Get();

        [HttpGet("{id:length(24)}", Name = "GetBill")]
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
        public ActionResult<Bill> Create([FromForm] Bill bill)
        {
            _billService.Create(bill);

            return CreatedAtRoute("GetBill", new { id = bill.Id.ToString() }, bill);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Bill billIn)
        {
            var bill = _billService.Get(id);

            if (bill == null)
            {
                return NotFound();
            }

            _billService.Update(id, billIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var bill = _billService.Get(id);

            if (bill == null)
            {
                return NotFound();
            }

            _billService.Remove(bill.Id);

            return NoContent();
        }
    }
}