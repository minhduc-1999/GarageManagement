
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services;
using GaraApi.Services.Identity;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly UserRoleService _roleService;


        public UsersController(UserService userService, UserRoleService roleService)
        {
            _userService = userService;
            _roleService = roleService;
        }

        [HttpGet]
        [Authorize("admin")]
        public ActionResult<List<User>> Get() =>
            _userService.Get();

        [HttpGet("{id:length(24)}", Name = "GetUser")]
        [Authorize("admin, manager, receptionist, storekeeper, employee")]
        public ActionResult<User> Get(string id)
        {
            if ((HttpContext.Items["User"] as User).Id != id)
            {
                return StatusCode(403, "Forbidden");
            }
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        [Authorize("admin")]
        public ActionResult<User> Create([FromForm] AccountModel account)
        {
            var curUser = _userService.GetUserByUsername(account.Username);
            if (curUser != null)
                return BadRequest(new { message = "Username has been used" });
            var md5 = new MD5CryptoServiceProvider();
            var passHash = md5.ComputeHash(Encoding.ASCII.GetBytes(account.Password));
            User user = new User()
            {
                Username = account.Username,
                PasswordHash = Encoding.ASCII.GetString(passHash),
                AccessFailCount = 0,
                Role = account.Role,
                UserClaims = new UserClaim()
                {
                    Email = account.Email,
                    PhoneNumber = account.PhoneNumber,
                    DateOB = account.DateOB,
                    FirstName = account.FirstName,
                    LastName = account.LastName,
                    Address = account.Address
                }
            };
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id.ToString() }, user);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.Id);

            return NoContent();
        }

        [HttpGet("roles")]
        [Authorize("admin")]
        public ActionResult<List<UserRole>> GetRoles() =>
            _roleService.Get();

        [HttpPost("unlock")]
        [Authorize("admin")]
        public ActionResult Unlock([FromQuery] string id)
        {
            var res = _userService.UnLock(id);
            if (res)
                return Ok(new { message = "Mở khoá tài khoản thành công" });
            return StatusCode(501);
        }

        [HttpPost("reset")]
        [Authorize("admin")]
        public ActionResult ResetPassword([FromForm] string id, [FromForm] string newPassword)
        {
            var res = _userService.ResetPass(id, newPassword);
            if (res)
                return Ok(new { message = "Đặt lại mật khẩu thành công" });
            return StatusCode(501);
        }

    }
}