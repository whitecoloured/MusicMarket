using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo
{
    public record EditUserInfoCommand(UserModel UserModel, KeyValuePair<string, StringValues> HeaderData) :IRequest;
}
