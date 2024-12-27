

using System;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProductsAdmin
{
    public class GetAllProductsAdminResponse
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string BrandName { get; set; }
        public string ImageURL {  get; set; }
    }
}
