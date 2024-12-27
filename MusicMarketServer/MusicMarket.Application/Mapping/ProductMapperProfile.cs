using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Products;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProductsAdmin;
using MusicMarket.Application.CommandsAndQueries.Products.GetProductInfo;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Mapping
{
    public class ProductMapperProfile : Profile
    {
        public ProductMapperProfile()
        {
            CreateMap<Product, GetAllProductsResponse>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(p => p.Brand.BrandName))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(p =>p.Price))
                .ForMember(dest=> dest.ImageURL, opt=> opt.MapFrom(p=> p.ImageURL));

            CreateMap<Product, GetProductInfoResponse>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Desc, opt => opt.MapFrom(p => p.Desc))
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(p => p.Brand.BrandName))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(p => p.Category))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(p => p.Price))
                .ForMember(dest=> dest.ImageURL, opt=> opt.MapFrom(p=> p.ImageURL))
                .ForMember(dest => dest.Characteristics, opt => opt.MapFrom(p => p.Characteristics));

            CreateMap<ProductModel, Product>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Desc, opt => opt.MapFrom(p => p.Desc))
                .ForMember(dest=> dest.Category, opt=> opt.MapFrom(p=> p.Category))
                .ForMember(dest=> dest.Price, opt=> opt.MapFrom(p=> p.Price))
                .ForMember(dest=> dest.Characteristics, opt=> opt.MapFrom(p=> p.Characteristics));

            CreateMap<Product, GetAllProductsAdminResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(p => p.Brand.BrandName))
                .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(p => p.ImageURL));
        }
    }
}
