using System;


namespace MusicMarket.Application.CommandsAndQueries.Brands.GetAllBrands
{
    public record GetAllBrandsResponse(Guid ID, string BrandName);
}
