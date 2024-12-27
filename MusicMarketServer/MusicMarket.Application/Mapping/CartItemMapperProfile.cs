using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Carts.GetUsersCart;
using MusicMarket.Core.Models;


namespace MusicMarket.Application.Mapping
{
    public class CartItemMapperProfile : Profile
    {
        public CartItemMapperProfile()
        {
            CreateMap<Cart, GetUsersCartResponse>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(p => p.Product.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(p => p.Product.Price))
                .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(p => p.Product.ImageURL))
                .ForMember(dest => dest.ProductID, opt => opt.MapFrom(p => p.ProductID));
        }
    }
}
