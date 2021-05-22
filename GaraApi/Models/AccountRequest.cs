using System;

namespace GaraApi.Models
{
    public class AccountRequest
    {
        public string Username { get; set; }

        public string Password { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }

        public string Email { get; set; }
        public DateTime? DateOB { get; set; }
    }
}