
using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Models;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoriesController : ControllerBase
    {
        private readonly AccessoryService _accessoryService;

        public AccessoriesController(AccessoryService accessoryService)
        {
            _accessoryService = accessoryService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, employee, receptionist")]
        public ActionResult<List<Accessory>> Get() =>
            _accessoryService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessory")]
        [Authorize("admin, manager, storekeeper, employee, receptionist")]
        public ActionResult<Accessory> Get(string id)
        {
            var accessory = _accessoryService.Get(id);

            if (accessory == null)
            {
                return NotFound();
            }

            return accessory;
        }

        [HttpPost]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<Accessory> Create([FromForm] Accessory accessory)
        {
            _accessoryService.Create(accessory);

            return CreatedAtRoute("GetAccessory", new { id = accessory.Id.ToString() }, accessory);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin, manager, storekeeper")]
        public IActionResult Update(string id, [FromForm] AccessoryUpdateModel accessoryIn)
        {
            var accessory = _accessoryService.Get(id);

            if (accessory == null)
            {
                return NotFound();
            }

            accessory.Name = accessoryIn.Name;
            accessory.IssuePrice = accessoryIn.IssuePrice;
            accessory.AccessoryTypeId = accessoryIn.AccessoryTypeId;
            accessory.Description = accessoryIn.Description;


            _accessoryService.Update(id, accessory);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin, manager, storekeeper")]
        public IActionResult Delete(string id)
        {
            var exist = _accessoryService.isExisted(id);

            if (!exist)
            {
                return NotFound();
            }

            _accessoryService.Remove(id);

            return NoContent();
        }
    }
}