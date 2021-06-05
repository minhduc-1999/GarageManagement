using System.Security.Cryptography;
using System.Text;

namespace GaraApi.Utils
{
    public class Helpers
    {
        static public string Md5Hash(string src)
        {
            var md5 = new MD5CryptoServiceProvider();
            var hash = Encoding.ASCII.GetString(md5.ComputeHash(Encoding.ASCII.GetBytes(src)));
            return hash;
        }

    }
}