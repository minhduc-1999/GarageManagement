using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GaraApi.Entities.Identity;
using GaraApi.Interfaces;
using GaraApi.Models;
using GaraApi.Utils;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace GaraApi.Services.Identity
{
    public class AuthenticateService : IAuthentication
    {
        private readonly UserService _userService;
        private readonly UserRoleService _userRoleService;

        private readonly AppSettings _appSettings;
        public AuthenticateService(UserService userService, UserRoleService userRoleService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
            _userRoleService = userRoleService;
        }
        public Tuple<bool, object> Authenticate(AuthenticateRequest model)
        {
            var user = _userService.GetUserByUsername(model.Username);
            if (user == null)
                return new Tuple<bool, object>(false, "Username không chính xác");
            if (user.IsLock)
            {
                return new Tuple<bool, object>(false, "Tài khoản đã bị khoá");
            }
            var passHash = Helpers.Md5Hash(model.Password);
            // var md5 = new MD5CryptoServiceProvider();
            // var passHash = Encoding.ASCII.GetString(md5.ComputeHash(Encoding.ASCII.GetBytes(model.Password)));
            if (!user.PasswordHash.Equals(passHash))
            {
                if (_userService.Lock(user.Id))
                    return new Tuple<bool, object>(false, "Sai mật khẩu 5 lần. Tài khoản bị tạm khoá");
                return new Tuple<bool, object>(false, "Mật khẩu không chính xác");
            }

            var token = generateJwtToken(user);
            _userService.Update(user.Id, "AccessFailCount", 0);
            return new Tuple<bool, object>(true, new AuthenticateResponse(user, token));
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 1 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var role = _userRoleService.Get(user.Role);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("id", user.Id.ToString()),
                    new Claim("role", role)
                }),
                Expires = DateTime.UtcNow.AddDays(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}