using MusicMarket.Core.Enums;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Products
{
    public record ProductModel(string Name, string Desc, ProductCategory Category, decimal Price, List<KeyValuePair<string, string>> Characteristics, string ImageURL);
}
