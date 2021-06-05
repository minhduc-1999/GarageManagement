using System;
using GaraApi.Entities.Identity;
using GaraApi.Models;

namespace GaraApi.Interfaces
{
    public interface IAccountService
    {
        Tuple<bool, string> ChangePassword(ChangePassRequest model);
        Tuple<bool, string> UpdateProfile(string id, UserClaim claim);
    }
}