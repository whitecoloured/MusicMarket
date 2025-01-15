using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Users.GetUserRole
{
    public record GetUserRoleQuery(KeyValuePair<string, StringValues> HeaderData) : IRequest<string>;
}
