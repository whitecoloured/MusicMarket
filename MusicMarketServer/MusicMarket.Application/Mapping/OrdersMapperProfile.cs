using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Orders;
using MusicMarket.Application.CommandsAndQueries.Orders.GetAllOrders;
using MusicMarket.Application.CommandsAndQueries.Orders.GetCertainOrderInfo;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Mapping
{
    public class OrdersMapperProfile :Profile
    {
        public OrdersMapperProfile()
        {
            CreateMap<Order, OrderModelResponse>()
                .ForMember(dest=> dest.ID, opt=> opt.MapFrom(p=> p.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Product.Name))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(p => p.Product.Price))
                .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(p => p.Product.ImageURL))
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(p => p.OrderDate))
                .ForMember(dest => dest.OrderReceived, opt => opt.MapFrom(p => p.OrderReceived));

            CreateMap<Order, GetCertainOrderInfoResponse>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Product.Name))
                .ForMember(dest => dest.BrandName, opt => opt.MapFrom(p => p.Product.Brand.BrandName))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(p => p.Product.Category))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(p => p.Product.Price))
                .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(p => p.Product.ImageURL))
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(p => p.OrderDate))
                .ForMember(dest => dest.OrderReceived, opt => opt.MapFrom(p => p.OrderReceived));

        }
    }
}
