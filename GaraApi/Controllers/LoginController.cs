
using System.Collections.Generic;
using GaraApi.Entities.Form;
using GaraApi.Interfaces;
using GaraApi.Models;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthentication _authService;
        private readonly IAccountService _accountService;

        public LoginController(IAuthentication authService, IAccountService accountService)
        {
            _authService = authService;
            _accountService = accountService;
        }

        [HttpPost("login")]
        public ActionResult Login([FromForm] AuthenticateRequest model)
        {
            var response = _authService.Authenticate(model);

            if (!response.Item1)
                return BadRequest(new { message = response.Item2.ToString() });
            return Ok(response.Item2);
        }

        [HttpPost("account/password")]
        [Authorize("admin, manager, storekeeper, employee, receptionist")]
        public ActionResult ChangePassword([FromForm] ChangePassRequest model)
        {
            var res = _accountService.ChangePassword(model);
            if (!res.Item1)
                return BadRequest(new { message = res.Item2 });
            return Ok(new { message = "Thay đổi mật khẩu thành công" });
        }
    }
}