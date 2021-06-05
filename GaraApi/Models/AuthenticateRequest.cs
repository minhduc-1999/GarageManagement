using System;
using System.ComponentModel.DataAnnotations;

namespace GaraApi.Models
{
    public class AuthenticateRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string Password { get; set; }
    }
}