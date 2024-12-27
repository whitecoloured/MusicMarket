using MediatR;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Carts.AddCartItem
{
    public record AddCartItemCommand(Guid ProductID, KeyValuePair<string, StringValues> HeaderData) : IRequest;
}
