
using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Services;
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
        public ActionResult<List<Accessory>> Get() =>
            _accessoryService.Get();

        [HttpGet("{id:length(24)}", Name = "GetAccessory")]
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
        public ActionResult<Accessory> Create([FromForm] Accessory accessory)
        {
            _accessoryService.Create(accessory);

            return CreatedAtRoute("GetAccessory", new { id = accessory.Id.ToString() }, accessory);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Accessory accessoryIn)
        {
            var accessory = _accessoryService.Get(id);

            if (accessory == null)
            {
                return NotFound();
            }

            _accessoryService.Update(id, accessoryIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var accessory = _accessoryService.Get(id);

            if (accessory == null)
            {
                return NotFound();
            }

            _accessoryService.Remove(accessory.Id);

            return NoContent();
        }
    }
}