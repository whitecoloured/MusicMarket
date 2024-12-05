using MediatR;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Users.DeleteUser
{
    public record DeleteUserCommand(KeyValuePair<string, StringValues> HeaderData) : IRequest;
}
