using MediatR;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses;
using MusicMarket.Core.Enums;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts
{
    public record GetAllProductsQuery(Guid? BrandID, ProductCategory? Category, (decimal,decimal)? Prices, string SortItem, bool OrderByAsc=true, int Page=1) : IRequest<DisplayProductsResponse>;
}
