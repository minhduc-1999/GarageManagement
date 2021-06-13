using System.Collections.Generic;
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

        public AccessoryReceiptsController(AccessoryReceiptService accReceiptService)
        {
            _accReceiptService = accReceiptService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<List<AccessoryReceipt>> Get() =>
            _accReceiptService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessoryReceipt")]
        [Authorize("admin, manager, storekeeper")]
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