
using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Interfaces;
using GaraApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthentication _authService;

        public LoginController(IAuthentication authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public ActionResult<List<Bill>> Login([FromForm] AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });
            return Ok(response);
        }
    }
}