using MediatR;
using Microsoft.Extensions.Primitives;
using MusicMarket.Core.Models;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo
{
    public record EditUserInfoCommand(UserEditModel UserModel, KeyValuePair<string, StringValues> HeaderData) :IRequest;
}
