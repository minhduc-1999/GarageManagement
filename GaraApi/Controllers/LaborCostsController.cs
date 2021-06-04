using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LaborCostsController : ControllerBase
    {
        private readonly LaborCostService _laborCostService;

        public LaborCostsController(LaborCostService laborCostService)
        {
            _laborCostService = laborCostService;
        }

        [HttpGet]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<LaborCost>> Get() =>
            _laborCostService.Get();

        [HttpGet("{id:length(24)}", Name = "GetLaborCost")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<LaborCost> Get(string id)
        {
            var laborCost = _laborCostService.Get(id);

            if (laborCost == null)
            {
                return NotFound();
            }

            return laborCost;
        }

        [HttpPost]
        [Authorize("admin, manager")]
        public ActionResult<LaborCost> Create([FromForm] LaborCost laborCost)
        {
            _laborCostService.Create(laborCost);

            return CreatedAtRoute("GetLaborCost", new { id = laborCost.Id.ToString() }, laborCost);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Update(string id, LaborCost laborCostIn)
        {
            var laborCost = _laborCostService.Get(id);

            if (laborCost == null)
            {
                return NotFound();
            }

            _laborCostService.Update(id, laborCostIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Delete(string id)
        {
            var laborCost = _laborCostService.Get(id);

            if (laborCost == null)
            {
                return NotFound();
            }

            _laborCostService.Remove(laborCost.Id);

            return NoContent();
        }
    }
}