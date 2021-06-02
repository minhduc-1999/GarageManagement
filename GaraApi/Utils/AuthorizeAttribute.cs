using System;
using System.Collections.Generic;
using GaraApi.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace GaraApi.Utils
{
    [AttributeUsage(AttributeTargets.Method)]
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
            if (Roles.Count == 0)
                return;
            User user = null;
            String role = null;
            if (context.HttpContext.Items.ContainsKey("User"))
                user = (User)context.HttpContext.Items["User"];
            if (context.HttpContext.Items.ContainsKey("UserRole"))
                role = context.HttpContext.Items["UserRole"].ToString();

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