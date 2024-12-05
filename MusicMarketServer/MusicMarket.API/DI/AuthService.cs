using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MusicMarket.API.Extensions;
using MusicMarket.Core.Enums;
using MusicMarket.Core.Options;
using System.Net;
using System.Text;

namespace MusicMarket.API.DI
{
    public static class AuthService
    {
        public static IServiceCollection AddAuthService(this IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {

                   options.TokenValidationParameters = new()
                   {
                       ValidateIssuer = false,
                       ValidateAudience = false,
                       ValidateIssuerSigningKey = true,
                       ValidateLifetime = true,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtOptions.SecretKey))
                   };
                   options.Events = new()
                   {
                       OnChallenge = async context =>
                       {
                           context.HandleResponse();
                           await context.Response.HandleError(HttpStatusCode.Unauthorized, "You haven't logged in!");
                       },
                       OnForbidden=async context=>
                       {
                           await context.Response.HandleError(HttpStatusCode.Forbidden, "It seems you got no permisson to do such actions!");
                       }
                   };
               }
            );

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", policy =>
                {
                    policy.RequireClaim("Role", Role.Admin.ToString());
                });

                options.AddPolicy("UserPolicy", policy =>
                {
                    policy.RequireAuthenticatedUser();
                });
            }
            );

            return services;
        }
    }
}
