using System;
using GaraApi.Entities.Identity;
using GaraApi.Models;

namespace GaraApi.Interfaces
{
    public interface IAuthentication
    {
        Tuple<bool, object> Authenticate(AuthenticateRequest model);
    }
}