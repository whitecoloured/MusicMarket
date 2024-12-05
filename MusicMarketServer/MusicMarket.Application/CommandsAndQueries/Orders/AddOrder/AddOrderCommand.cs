using MediatR;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Orders.AddOrder
{
    public record AddOrderCommand(KeyValuePair<string, StringValues> HeaderData, Guid ProductID): IRequest;
}
