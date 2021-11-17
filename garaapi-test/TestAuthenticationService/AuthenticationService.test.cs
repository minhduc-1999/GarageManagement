using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services.Identity;
using GaraApi.Utils;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Moq;
using NUnit.Framework;

namespace garaapi_test.TestAuthenticationService
{
    [TestFixture]
    public class AuthenticationServiceTest
    {
        private AuthenticateService _authenticateService;
        private AppSettings _appSettings;

        [SetUp]
        public void Setup()
        {
            _appSettings = new AppSettings { Secret = "6a154174a3153c4fc8f17a998f5122ca7c55b4593f96c3edd20e67d45e6055521160d50d0cc6a6b30647618454ba59a177a839a19d85027d86e2ce8cee2dda03" };
            IOptions<AppSettings> settingOpts = Options.Create<AppSettings>(_appSettings);
            var userServiceMock = new Mock<IUserService>();
            User[] mockUsers = new User[] {
                new User { Username = "admin", PasswordHash = "!#/)zW??C?J\u000eJ?\u001f?", Id = "1", Role = "admin", AccessFailCount = 5, IsLock = false },
                new User { Username = "manager", PasswordHash = "\u001d\u0002X?D\n?\u0019?\u0016)+#\u001e1?", Id = "2", Role = "manager", AccessFailCount = 5, IsLock = false },
            };
            userServiceMock.Setup(x => x.GetUserByUsername(It.IsAny<string>()))
            .Returns<string>(username =>
            {
                return mockUsers.FirstOrDefault(user => user.Username == username);
            });
            userServiceMock.Setup(x => x.Lock(It.IsAny<string>())).Returns<string>(
                id =>
                {
                    return false;
                }
            );
            userServiceMock.Setup(x => x.Update(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<object>())).Returns(true);
            _authenticateService = new AuthenticateService(userServiceMock.Object, settingOpts);
        }

        [Test]
        [TestCaseSource(typeof(TestJwtCases))]
        public void Should_GenerateJwt(User userTest)
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
            Assert.IsTrue(testResult, "Should generate valid jwt");
        }

        [Test]
        [TestCaseSource(typeof(LoginWithWrongUsernameCases))]
        public void Should_LoginFail_When_EnterWrongUsername(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Username không chính xác"));
        }

        [Test]
        [TestCaseSource(typeof(LoginWithWrongPasswordCases))]
        public void Should_LoginFail_When_EnterWrongPassword(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Mật khẩu không chính xác"));
        }

        [Test]
        [TestCaseSource(typeof(LoginWithValidCredentialCases))]
        public void Should_LoginSuccess_When_EnterValidCredential(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.IsTrue(result.Item1, "Should login successfully");
        }
    }
}