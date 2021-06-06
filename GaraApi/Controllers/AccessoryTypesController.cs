using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessoryTypesController : ControllerBase
    {
        private readonly AccessoryTypeService _accessoryTypeService;

        public AccessoryTypesController(AccessoryTypeService accessoryTypeService)
        {
            _accessoryTypeService = accessoryTypeService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, receptionist, employee")]
        public ActionResult<List<AccessoryType>> Get() =>
            _accessoryTypeService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessoryType")]
        [Authorize("admin, manager, storekeeper, receptionist, employee")]
        public ActionResult<AccessoryType> Get(string id)
        {
            var accessoryType = _accessoryTypeService.Get(id);

            if (accessoryType == null)
            {
                return NotFound();
            }

            return accessoryType;
        }

        [HttpPost]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<AccessoryType> Create([FromForm] AccessoryType accessoryType)
        {
            var curAccessoryType = _accessoryTypeService.Get(accessoryType.Id);
            if (curAccessoryType != null)
                return BadRequest(new { message = "Accessory Type has been used" });
            _accessoryTypeService.Create(accessoryType);

            return CreatedAtRoute("GetAccessoryType", new { id = accessoryType.Id.ToString() }, accessoryType);
        }

        [HttpPut]
        [Authorize("admin, manager, storekeeper")]
        public IActionResult Update([FromBody] AccessoryType accessoryTypeIn)
        {
            var accessoryType = _accessoryTypeService.Get(accessoryTypeIn.Id);

            if (accessoryType == null)
            {
                return NotFound();
            }

            _accessoryTypeService.Update(accessoryTypeIn.Id, accessoryTypeIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin, manager, storekeeper")]
        public IActionResult Delete(string id)
        {
            var accessoryType = _accessoryTypeService.Get(id);

            if (accessoryType == null)
            {
                return NotFound();
            }

            _accessoryTypeService.Remove(accessoryType.Id);

            return NoContent();
        }
    }
}