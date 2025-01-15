using MusicMarket.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetProductInfoAdmin
{
    public class GetProductInfoAdminResponse
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public ProductCategory Category { get; set; }
        public Guid BrandID { get;set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public List<KeyValuePair<string, string>> Characteristics { get; set; }
    }
}
