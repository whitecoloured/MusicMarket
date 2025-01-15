using MusicMarket.Core.Enums;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Context;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MusicMarket.Infrastructure.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly MMContext _context;
        public ProductRepository(MMContext context)
        {
            _context = context;
        }
        public async Task AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProduct(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task EditProductInfo(Product product, Product newProduct)
        {
            product.Name = newProduct.Name;
            product.Desc = newProduct.Desc;
            product.Price = newProduct.Price;
            product.ImageURL = newProduct.ImageURL;
            product.Category = newProduct.Category;
            product.Characteristics = newProduct.Characteristics;
            await _context.SaveChangesAsync();
        }

        public IQueryable<Product> GetAllProducts()
        {
            var data = _context.Products
                                .AsNoTracking()
                                .Include(p=> p.Brand)
                                .AsQueryable();
            return data;
        }

        public async Task<Product> GetCertainProductByIDAsNoTracking(Guid ID)
        {
            var data = await _context.Products
                                .AsNoTracking()
                                .Include(p => p.Brand)
                                .FirstOrDefaultAsync(p=> p.Id==ID);
            return data;
        }

        public async Task<Product> GetCertainProductByID(Guid ID)
        {
            var data = await _context.Products
                                .Include(p=> p.Brand)
                                .FirstOrDefaultAsync(p=> p.Id==ID);
            return data;
        }

        public async Task<List<Product>> GetConvertedToListProducts(IQueryable<Product> products)
        {
            return await products.ToListAsync();
        }

        public IQueryable<Product> GetFilteredByBrandProducts(IQueryable<Product> products, IEnumerable<Guid?> BrandIDs)
        {
            return products.Where(p => BrandIDs.Contains(p.BrandID));
        }

        public IQueryable<Product> GetFilteredByCategoryProducts(IQueryable<Product> products, IEnumerable<ProductCategory?> Categories)
        {
            return products.Where(p => Categories.Contains(p.Category));
        }

        public IQueryable<Product> GetFilteredByPriceRangeProducts(IQueryable<Product> products, decimal? firstPrice, decimal? secondPrice)
        {
            return products.Where(p => firstPrice <= p.Price && p.Price <= secondPrice);
        }

        public IQueryable<Product> GetProductsByPage(IQueryable<Product> products, int page)
        {
            return products
                    .Skip((page - 1) * 12)
                    .Take(12);
        }

        public IQueryable<Product> GetSortedProducts(IQueryable<Product> products, bool OrderByAsc, string SortItem)
        {
            Expression<Func<Product, object>> orderKey = SortItem switch
            {
                "price" => p => p.Price,
                _ => p => p.Name
            };
            var sortedData = OrderByAsc ? products.OrderBy(orderKey) : products.OrderByDescending(orderKey);
            return sortedData;
        }

        public async Task<bool> HasTheProduct(Product product,Guid ProductID)
        {
            return await _context.Products.AnyAsync(p => p.Name.Replace(" ","").ToLower()==product.Name.Replace(" ", "").ToLower() && p.Id!=ProductID);
        }

        public IQueryable<Product> GetFilteredBySearchNameProducts(IQueryable<Product> products, string searchName)
        {
            return products.Where(p=> p.Name.ToLower().Contains(searchName.ToLower()));
        }
    }
}
