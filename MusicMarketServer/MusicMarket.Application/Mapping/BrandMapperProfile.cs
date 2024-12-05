
using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Brands.AddBrand;
using MusicMarket.Application.CommandsAndQueries.Brands.GetAllBrands;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Mapping
{
    class BrandMapperProfile :Profile
    {
        public BrandMapperProfile()
        {
            CreateMap<Brand, GetAllBrandsResponse>()
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(p => p.BrandName))
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id));

            CreateMap<AddBrandCommand, Brand>()
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(p => p.BrandName));
        }
    }
}
