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
        public string FullName { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }

        public AuthenticateResponse(User user, string token)
        {
            Id = user.Id;
            FullName = user.UserClaims?.FullName;
            Username = user.Username;
            Token = token;
            Role = user.Role;
        }
    }
}