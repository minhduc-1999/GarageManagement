using System.Collections.Generic;
using GaraApi.Models.Form;
using GaraApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoryReceiptController : ControllerBase
    {
        private readonly AccessoryReceiptService _accReceiptService;

        public AccessoryReceiptController(AccessoryReceiptService accReceiptService)
        {
            _accReceiptService = accReceiptService;
        }

        [HttpGet]
        public ActionResult<List<AccessoryReceipt>> Get() =>
            _accReceiptService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessoryReceipt")]
        public ActionResult<AccessoryReceipt> Get(string id)
        {
            var accReceipt = _accReceiptService.Get(id);

            if (accReceipt == null)
            {
                return NotFound();
            }

            return accReceipt;
        }

        [HttpPost]
        public ActionResult<AccessoryReceipt> Create([FromForm] AccessoryReceipt accReceipt)
        {
            _accReceiptService.Create(accReceipt);

            return CreatedAtRoute("GetAccessoryReceipt", new { id = accReceipt.Id.ToString() }, accReceipt);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, AccessoryReceipt accReceiptIn)
        {
            var accReceipt = _accReceiptService.Get(id);

            if (accReceipt == null)
            {
                return NotFound();
            }

            _accReceiptService.Update(id, accReceiptIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
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