using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Orders.GetAllOrders
{
    public record GetAllOrdersQuery(KeyValuePair<string, StringValues> HeaderData) : IRequest<List<OrderModelResponse>>;
}
