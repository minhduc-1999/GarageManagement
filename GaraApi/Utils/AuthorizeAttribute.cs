using System;
using System.Collections.Generic;
using GaraApi.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace GaraApi.Utils
{
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public List<string> Roles { get; set; }
        public AuthorizeAttribute(string roles)
        {
            var _roles = roles.Replace(" ", "").Split(',');
            Roles = new List<string>(_roles);
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (User)context.HttpContext.Items["User"];
            var role = context.HttpContext.Items["UserRole"].ToString();

            if (user == null || string.IsNullOrEmpty(role))
            {
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }

            if (!Roles.Exists(str => str == role))
            {
                context.Result = new JsonResult(new { message = "Forbidden" }) { StatusCode = StatusCodes.Status403Forbidden };

            }
        }
    }
}