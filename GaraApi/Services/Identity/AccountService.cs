
using System;
using GaraApi.Entities.Identity;
using GaraApi.Interfaces;
using GaraApi.Models;
using GaraApi.Utils;

namespace GaraApi.Services.Identity
{
    public class AccountService : IAccountService
    {
        private readonly UserService _userService;

        public AccountService(UserService userService)
        {
            _userService = userService;
        }
        public Tuple<bool, string> ChangePassword(ChangePassRequest model)
        {
            var user = _userService.Get(model.Id);
            if (user == null)
                return new Tuple<bool, string>(false, "User không tồn tại");
            if (user.Username != model.UserName)
                return new Tuple<bool, string>(false, "Username không chính xác");
            var passHash = Helpers.Md5Hash(model.OldPassword);
            // var md5 = new MD5CryptoServiceProvider();
            // var passHash = Encoding.ASCII.GetString(md5.ComputeHash(Encoding.ASCII.GetBytes(model.OldPassword)));
            if (user.PasswordHash.Equals(passHash))
            {
                var res = new Tuple<bool, string>(_userService.ResetPass(model.Id, model.NewPassword), "");
                return res;
            }
            return new Tuple<bool, string>(false, "Mật khẩu cũ không chính xác");
        }

        public Tuple<bool, string> UpdateProfile(string id, UserClaim claim)
        {
            var res = _userService.Update(id, "UserClaims", claim);
            if (res)
                return new Tuple<bool, string>(true, "Cập nhật thông tin cá nhân thành công");
            return new Tuple<bool, string>(false, "Cập nhật thất bại");
        }
    }
}