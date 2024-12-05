using System.Collections.Generic;
using MediatR;
using Microsoft.Extensions.Primitives;

namespace MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo
{
    public record GetUserInfoQuery(KeyValuePair<string, StringValues> HeaderData) : IRequest<GetUserInfoResponse>;
}
