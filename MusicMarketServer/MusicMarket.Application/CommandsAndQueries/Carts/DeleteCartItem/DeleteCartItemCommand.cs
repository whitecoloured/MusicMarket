using MediatR;
using System;


namespace MusicMarket.Application.CommandsAndQueries.Carts.DeleteCartItem
{
    public record DeleteCartItemCommand(Guid CartItemID) : IRequest;
}
