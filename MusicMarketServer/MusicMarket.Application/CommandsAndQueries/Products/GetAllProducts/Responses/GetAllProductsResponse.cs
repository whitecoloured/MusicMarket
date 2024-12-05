using System;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses
{
    public class GetAllProductsResponse
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
        public decimal Price { get; set; }
    }
}
