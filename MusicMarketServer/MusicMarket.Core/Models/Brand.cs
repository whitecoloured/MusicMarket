using System;
using System.Collections.Generic;

namespace MusicMarket.Core.Models
{
    public class Brand
    {
        public Guid Id { get; set; }
        public string BrandName { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
