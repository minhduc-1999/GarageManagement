using System;
using GaraApi.Entities.Identity;

namespace GaraApi.Models
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FirstName = user.UserClaims.FirstName;
            LastName = user.UserClaims.LastName;
            Username = user.Username;
            Token = token;
        }
    }
}