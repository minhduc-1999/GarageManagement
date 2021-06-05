using System;
using GaraApi.Models;

namespace GaraApi.Interfaces
{
    public interface IAccountService
    {
        Tuple<bool, string> ChangePassword(ChangePassRequest model);
    }
}