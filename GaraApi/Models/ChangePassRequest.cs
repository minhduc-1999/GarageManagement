using System;

using System.ComponentModel.DataAnnotations;
namespace GaraApi.Models
{
    public class ChangePassRequest
    {
        [Required]
        [StringLength(24, MinimumLength = 24)]
        public string Id { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string UserName { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string OldPassword { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 5)]
        public string NewPassword { get; set; }

    }
}