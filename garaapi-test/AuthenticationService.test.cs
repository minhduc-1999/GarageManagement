using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using GaraApi.Entities.Identity;
using GaraApi.Services.Identity;
using GaraApi.Utils;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NUnit.Framework;

namespace garaapi_test
{
    [TestFixture]
    public class AuthenticationServiceTest
    {
        private AuthenticateService _authenticateService;
        private AppSettings _appSettings;

        static User[] TestJwtSource =
    {
        new User
            {
                Id = "12312900",
                Role = "admin"
            },
        new User
            {
                Id = "893109320",
                Role = "manager"
            },
        new User
            {
                Id = "491039021",
                Role = "admin"
            }
    };
        [SetUp]
        public void Setup()
        {
            _appSettings = new AppSettings { Secret = "6a154174a3153c4fc8f17a998f5122ca7c55b4593f96c3edd20e67d45e6055521160d50d0cc6a6b30647618454ba59a177a839a19d85027d86e2ce8cee2dda03" };
            IOptions<AppSettings> settingOpts = Options.Create<AppSettings>(_appSettings);
            _authenticateService = new AuthenticateService(null, settingOpts);
        }

        [Test]
        [TestCaseSource("TestJwtSource")]
        public void TestJwt(User userTest)
        {

            string jwt = _authenticateService.generateJwtToken(userTest);
            bool testResult = false;
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                tokenHandler.ValidateToken(jwt, new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "id").Value;
                var role = jwtToken.Claims.First(x => x.Type == "role").Value;
                if (userId == userTest.Id && role == userTest.Role)
                {
                    testResult = true;
                }
                else testResult = false;

            }
            catch (SecurityTokenExpiredException e)
            {
                testResult = false;
            }
            Assert.IsTrue(testResult, "has Jwt");
        }
    }
}