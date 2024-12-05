using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Products.EditProduct
{
    public record EditProductCommand(ProductModel Model, Guid ProductID) :IRequest;
}
