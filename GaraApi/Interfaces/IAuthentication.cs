using GaraApi.Entities.Identity;
using GaraApi.Models;

namespace GaraApi.Interfaces
{
    public interface IAuthentication
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
    }
}