using MusicMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Interfaces
{
    public interface IBrandRepository
    {
        Task<List<Brand>> GetAllBrands();

        Task<Brand> GetCertainBrandByID(Guid ID);

        Task<bool> HasTheBrand(string brandName);

        Task AddBrand(Brand brand);

        Task DeleteBrand(Brand brand);
    }
}
