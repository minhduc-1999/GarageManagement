using System.Collections;
using GaraApi.Entities.Identity;
using GaraApi.Models;

namespace garaapi_test.TestAuthenticationService
{
    class TestJwtCases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new User[]
            {
                new User
                {
                Id = "893109320",
                Role = "manager",
                AccessFailCount = 1,
                IsLock = false,
                PasswordHash = "21232f297a57a5a743894a0e4a801fc3",
                Username = "manager1"
                },
            };
        }
    }
    class LoginWithWrongUsernameCases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new AuthenticateRequest[]
            {
                new AuthenticateRequest
                {
                Username = "wrongusername",
                Password = "admin"
                }
            };
        }
    }

    class LoginWithWrongPasswordCases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new AuthenticateRequest[]
            {
                new AuthenticateRequest
                {
                Username = "admin",
                Password = "wrongpassword"
                }
            };
        }
    }
    class LoginWithValidCredentialCases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new AuthenticateRequest
            {
                Username = "admin",
                Password = "admin"
            };
            yield return new AuthenticateRequest
            {
                Username = "manager",
                Password = "manager"
            };


        }
    }
}