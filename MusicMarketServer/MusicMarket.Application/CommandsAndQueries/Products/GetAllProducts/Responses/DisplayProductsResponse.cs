using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses
{
    public record DisplayProductsResponse(List<GetAllProductsResponse> Products, int ProductsAmount);
}
