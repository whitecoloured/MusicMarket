using Microsoft.AspNetCore.Http;
using System.Net;
using System.Threading.Tasks;

namespace MusicMarket.API.Extensions
{
    public static class HandleErrorMethod
    {
        ///<summary>
        ///Simply handles an error and outputs it through body response
        /// </summary>
        public static async Task HandleError(this HttpResponse response, HttpStatusCode code, string message)
        {
            int codeNum = (int)code;
            response.StatusCode = codeNum;
            response.ContentType = "application/json";
            await response.WriteAsJsonAsync(new { Code = codeNum, Type = code.ToString(), Message = message });
        }
    }
}
