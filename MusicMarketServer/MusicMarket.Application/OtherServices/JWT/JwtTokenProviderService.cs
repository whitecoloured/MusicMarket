using Microsoft.IdentityModel.Tokens;
using MusicMarket.Core.Models;
using System.Security.Claims;
using System.Text;
using MusicMarket.Core.Options;
using System.IdentityModel.Tokens.Jwt;
using System;

namespace MusicMarket.Application.OtherServices.JWT
{
    public static class JwtTokenProviderService
    {
        public static string GenerateToken(User user)
        {
            Claim[] claims = new[]
            {
                new Claim("ID", user.Id.ToString()),
                new Claim("Role", user.Role.ToString())
            };

            SigningCredentials signingCredentials = new(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.SecretKey)), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddDays(1)
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }
    }
}
