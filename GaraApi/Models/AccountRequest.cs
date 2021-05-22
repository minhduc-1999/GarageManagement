using System;

using System.ComponentModel.DataAnnotations;
namespace GaraApi.Models
{
    public class AccountModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Role { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public DateTime? DateOB { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
}