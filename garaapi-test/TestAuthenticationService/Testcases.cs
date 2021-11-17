using System.Collections;
using GaraApi.Entities.Identity;
using GaraApi.Models;

namespace garaapi_test.TestAuthenticationService
{
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

    class LoginToLockedAccountCases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new AuthenticateRequest
            {
                Username = "manager1",
                Password = "manager"
            };
        }
    }

    class LoginToAdminAccoutWithWrongPasswordCases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new AuthenticateRequest
            {
                Username = "admin",
                Password = "wrongpassword"
            };
        }
    }
    class LoginToAccountHasAccessFailCountEqual4Cases : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            yield return new AuthenticateRequest
            {
                Username = "manager",
                Password = "wrongpassword"
            };
        }
    }
}