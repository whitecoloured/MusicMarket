using MusicMarket.Core.Enums;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetProductInfo
{
    public class GetProductInfoResponse
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public ProductCategory Category { get; set; }
        public string BrandName { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public List<KeyValuePair<string, string>> Characteristics { get; set; }
    }
}
