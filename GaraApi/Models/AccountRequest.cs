using System;

using System.ComponentModel.DataAnnotations;
namespace GaraApi.Models
{
    public class AccountModel
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string Password { get; set; }
        [Required]
        [StringLength(24, MinimumLength = 24)]
        public string RoleId { get; set; }
        [Phone]
        [Required]
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DateOB { get; set; }
        [StringLength(50)]
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Address { get; set; }

    }
}