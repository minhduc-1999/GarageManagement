using System;
using GaraApi.Entities.Identity;
using System.Text.Json.Serialization;

namespace GaraApi.Models
{
    public class AuthenticateResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string FirstName { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
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