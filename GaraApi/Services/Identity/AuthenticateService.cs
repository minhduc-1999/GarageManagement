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
        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _userService.GetUserByUsername(model.Username);

            if (user == null)
                return null;
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);

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
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}