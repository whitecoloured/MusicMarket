using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Carts.GetUsersCart
{
    public record GetUsersCartQuery(KeyValuePair<string, StringValues> HeaderData) : IRequest<List<GetUsersCartResponse>>;
}
