using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReferencesController : ControllerBase
    {
        private readonly ReferenceService _referenceService;

        public ReferencesController(ReferenceService referenceService)
        {
            _referenceService = referenceService;
        }

        [HttpGet]
        [Authorize("admin, manager")]
        public ActionResult<List<Reference>> Get() =>
            _referenceService.Get();

        [HttpGet("{id:length(24)}", Name = "GetRef")]
        [Authorize("admin, manager")]
        public ActionResult<Reference> Get(string id)
        {
            var reference = _referenceService.Get(id);

            if (reference == null)
            {
                return NotFound();
            }

            return reference;
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Update(string id, Reference refIn)
        {
            var reference = _referenceService.Get(id);

            if (reference == null)
            {
                return NotFound();
            }

            _referenceService.Update(id, refIn);

            return NoContent();
        }
    }
}