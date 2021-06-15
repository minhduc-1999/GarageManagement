using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvidersController : ControllerBase
    {
        private readonly ProviderService _providerService;

        public ProvidersController(ProviderService providerService)
        {
            _providerService = providerService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<List<Provider>> Get() =>
            _providerService.Get();

        [HttpGet("{id:length(24)}", Name = "GetProvider")]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<Provider> Get(string id)
        {
            var provider = _providerService.Get(id);

            if (provider == null)
            {
                return NotFound();
            }

            return provider;
        }

        [HttpPost]
        [Authorize("admin, manager, storekeeper")]
        public ActionResult<Provider> Create([FromForm] Provider provider)
        {
            var curProvider = _providerService.GetProviderByName(provider.Name);
            if (curProvider != null)
                return BadRequest(new { message = "Provider has been used" });

            _providerService.Create(provider);

            return CreatedAtRoute("GetProvider", new { id = provider.Id.ToString() }, provider);
        }

        [HttpPut]
        [Authorize("admin, manager, storekeeper")]
        public IActionResult Update([FromBody] Provider providerIn)
        {
            var provider = _providerService.Get(providerIn.Id);

            if (provider == null)
            {
                return NotFound();
            }

            _providerService.Update(providerIn.Id, providerIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin, manager")]
        public IActionResult Delete(string id)
        {
            var provider = _providerService.Get(id);

            if (provider == null)
            {
                return NotFound();
            }

            _providerService.Remove(provider.Id);

            return NoContent();
        }
    }
}