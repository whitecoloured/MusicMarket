using System;
using System.Collections.Generic;
using MusicMarket.Core.Enums;

namespace MusicMarket.Core.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public ProductCategory Category { get; set; }
        public Brand Brand { get; set; }
        public Guid? BrandID { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public List<KeyValuePair<string, string>> Characteristics { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Cart> CartItems { get; set; }

    }
}
