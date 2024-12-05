using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Context;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MusicMarket.Infrastructure.Repositories.Implementations
{
    public class BrandRepository : IBrandRepository
    {
        private readonly MMContext _context;
        public BrandRepository(MMContext context)
        {
            _context = context;
        }
        public async Task AddBrand(Brand brand)
        {
            await _context.Brands.AddAsync(brand);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBrand(Brand brand)
        {
            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Brand>> GetAllBrands()
        {
            var data = await _context.Brands
                                .AsNoTracking()
                                .ToListAsync();
            return data;
        }

        public async Task<Brand> GetCertainBrandByID(Guid ID)
        {
            var data = await _context.Brands.FindAsync(ID);
            return data;
        }

        public async Task<bool> HasTheBrand(string brandName)
        {
            var result = await _context.Brands.AnyAsync(p => p.BrandName.Replace(" ", "").ToLower()==brandName.Replace(" ","").ToLower());
            return result;
        }
    }
}
