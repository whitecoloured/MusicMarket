using MusicMarket.Core.Enums;
using MusicMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Interfaces
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAllProducts();
        IQueryable<Product> GetFilteredByCategoryProducts(IQueryable<Product> products, ProductCategory category);

        IQueryable<Product> GetFilteredByBrandProducts(IQueryable<Product> products, Guid BrandID);
        IQueryable<Product> GetFilteredByPriceRangeProducts(IQueryable<Product> products,decimal firstPrice, decimal secondPrice);

        IQueryable<Product> GetSortedProducts(IQueryable<Product> products,bool OrderByAsc, string SortItem);
        IQueryable<Product> GetProductsByPage(IQueryable<Product> products,int page);

        Task<List<Product>> GetConvertedToListProducts(IQueryable<Product> products);

        Task<Product> GetCertainProductByIDAsNoTracking(Guid ID);

        Task<Product> GetCertainProductByID(Guid ID);

        Task AddProduct(Product product);

        Task DeleteProduct(Product product);

        Task EditProductInfo(Product product, Product newProduct);

        Task<bool> HasTheProduct(Product product);


    }
}
