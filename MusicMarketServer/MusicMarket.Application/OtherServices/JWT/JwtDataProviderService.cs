using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace MusicMarket.Application.OtherServices.JWT
{
    public static class JwtDataProviderService
    {
        public static Guid GetUserIDFromToken(KeyValuePair<string, StringValues> headerData)
        {
            var token = headerData.Value.ToString()["Bearer ".Length..];

            string stringID = new JwtSecurityTokenHandler().ReadJwtToken(token).Claims.FirstOrDefault(p => p.Type=="ID").Value;

            Guid ID = Guid.Parse(stringID);

            return ID;
        }

        public static string GetUserRoleFromToken(KeyValuePair<string, StringValues> headerData)
        {

            var token = headerData.Value.ToString()["Bearer ".Length..];

            string role = new JwtSecurityTokenHandler().ReadJwtToken(token).Claims.FirstOrDefault(p => p.Type == "Role").Value;

            return role;
        }
    }
}
