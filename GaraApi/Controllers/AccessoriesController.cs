
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
        private readonly AccessoryTypeService _accessoryTypeService;

        public AccessoriesController(AccessoryService accessoryService, AccessoryTypeService accessoryTypeService)
        {
            _accessoryService = accessoryService;
            _accessoryTypeService = accessoryTypeService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<List<Accessory>> Get() =>
            _accessoryService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessory")]
        [Authorize("admin, manager, storekeeper, receptionist")]
        public ActionResult<Accessory> Get(string id)
        {
            var accessory = _accessoryService.Get(id);

            if (accessory == null)
            {
                return NotFound();
            }

            return accessory;
        }

        // [HttpPost]
        // [Authorize("admin, manager, storekeeper")]
        // public ActionResult<Accessory> Create([FromForm] Accessory accessory)
        // {
        //     _accessoryService.Create(accessory);

        //     return CreatedAtRoute("GetAccessory", new { id = accessory.Id.ToString() }, accessory);
        // }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin, manager, storekeeper")]
        public IActionResult Update(string id, [FromForm] AccessoryUpdateModel accessoryIn)
        {
            var accessory = _accessoryService.Get(id);

            if (accessory == null)
            {
                return NotFound();
            }

            var accType = _accessoryTypeService.Get(accessoryIn.AccessoryTypeId);
            if (accType == null)
                return StatusCode(404, new { message = "Provider Not Existed" });

            accessory.Name = accessoryIn.Name;
            accessory.IssuePrice = accessoryIn.IssuePrice;
            accessory.AccessoryType = accType;
            accessory.Description = accessoryIn.Description;


            _accessoryService.Update(id, accessory);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin")]
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