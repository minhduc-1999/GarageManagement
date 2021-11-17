using System;
using System.Linq;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services.Identity;
using GaraApi.Utils;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;

namespace garaapi_test.TestAuthenticationService
{
    [TestFixture]
    public class AuthenticateTest
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
                new User { Username = "manager", PasswordHash = "\u001d\u0002X?D\n?\u0019?\u0016)+#\u001e1?", Id = "2", Role = "manager", AccessFailCount = 4, IsLock = false },
                new User { Username = "manager1", PasswordHash = "\u001d\u0002X?D\n?\u0019?\u0016)+#\u001e1?", Id = "3", Role = "manager", AccessFailCount = 3, IsLock = true },
            };
            userServiceMock.Setup(x => x.GetUserByUsername(It.IsAny<string>()))
            .Returns<string>(username =>
            {
                return mockUsers.FirstOrDefault(user => user.Username == username);
            });
            userServiceMock.Setup(x => x.Lock(It.IsAny<string>())).Returns<string>(
                id =>
                {
                    var accFailed = mockUsers.FirstOrDefault(user => user.Id == id).AccessFailCount;
                    if (accFailed == 4)
                    {
                        return true;
                    }
                    return false;
                }
            );
            userServiceMock.Setup(x => x.Update(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<object>())).Returns(true);
            _authenticateService = new AuthenticateService(userServiceMock.Object, settingOpts);
        }

        [Test]
        [TestCaseSource(typeof(LoginToLockedAccountCases))]
        public void Should_Fail_When_AccountIsLocked(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Tài khoản đã bị khoá"));
        }

        [Test]
        [TestCaseSource(typeof(LoginWithWrongUsernameCases))]
        public void Should_Fail_When_EnterWrongUsername(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Username không chính xác"));
        }

        [Test]
        [TestCaseSource(typeof(LoginWithWrongPasswordCases))]
        public void Should_Fail_When_EnterWrongPassword(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Mật khẩu không chính xác"));
        }

        [Test]
        [TestCaseSource(typeof(LoginWithValidCredentialCases))]
        public void Should_Success_When_EnterValidCredential(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.IsTrue(result.Item1, "Should login successfully");
        }

        [Test]
        [TestCaseSource(typeof(LoginToAdminAccoutWithWrongPasswordCases))]
        public void Should_Fail_When_EnterWrongPasswordOfAdminRoleAccount(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Mật khẩu không chính xác"));
        }

        [Test]
        [TestCaseSource(typeof(LoginToAccountHasAccessFailCountEqual4Cases))]
        public void Should_Fail_When_AlreadyLoginFail4Time(AuthenticateRequest model)
        {
            var result = _authenticateService.Authenticate(model);
            Assert.AreEqual(result, new Tuple<bool, object>(false, "Sai mật khẩu 5 lần. Tài khoản bị tạm khoá"));
        }

    }
}