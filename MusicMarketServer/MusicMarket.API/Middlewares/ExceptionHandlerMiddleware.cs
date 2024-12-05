using Microsoft.AspNetCore.Http;
using MusicMarket.API.Extensions;
using MusicMarket.Core.Exceptions;
using System;
using System.Net;
using System.Threading.Tasks;

namespace MusicMarket.API.Middlewares
{
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                switch (e)
                {
                    case BadRequestException:
                        await context.Response.HandleError(HttpStatusCode.BadRequest, e.Message);
                        break;
                    case NotFoundException:
                        await context.Response.HandleError(HttpStatusCode.NotFound, e.Message);
                        break;
                    default:
                        await context.Response.HandleError(HttpStatusCode.InternalServerError, e.Message);
                        break;
                }
            }
        }
    }
}
