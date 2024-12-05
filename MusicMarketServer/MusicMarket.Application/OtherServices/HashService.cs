using System;
using System.Security.Cryptography;
using System.Text;

namespace MusicMarket.Application.OtherServices
{
    public static class HashService
    {
        private static readonly MD5 md5 = MD5.Create();
        public static string GetHashPassword(string OGPassword)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(OGPassword);

            byte[] hashedBytes = md5.ComputeHash(bytes);

            string hashPassword = Convert.ToHexString(hashedBytes);

            return hashPassword;
        }
    }
}
