using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Products.DeleteProduct
{
    public record DeleteProductCommand(Guid ID): IRequest;
}
