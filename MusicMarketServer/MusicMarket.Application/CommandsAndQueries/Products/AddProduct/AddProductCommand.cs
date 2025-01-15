using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Products.AddProduct
{
    public record AddProductCommand(ProductModel Model ) :IRequest;
}
