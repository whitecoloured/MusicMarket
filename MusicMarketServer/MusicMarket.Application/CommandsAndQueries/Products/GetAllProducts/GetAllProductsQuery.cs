using MediatR;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses;
using MusicMarket.Core.Enums;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts
{
    public record GetAllProductsQuery(string SearchName, IEnumerable<Guid?> BrandIDs, IEnumerable<ProductCategory?> Categories, decimal? FirstPrice, decimal? SecondPrice, string SortItem, bool OrderByAsc=true, int Page=1) : IRequest<DisplayProductsResponse>;
}
