using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
namespace MusicMarket.Application.CommandsAndQueries.Users.EditPassword
{
    public record EditPasswordCommand(string CheckPassword,string NewPassword, KeyValuePair<string, StringValues> HeaderData) :IRequest;
}
