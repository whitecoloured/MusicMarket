using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Orders.DeleteOrder
{
    public record DeleteOrderCommand(Guid ID) : IRequest;
}
