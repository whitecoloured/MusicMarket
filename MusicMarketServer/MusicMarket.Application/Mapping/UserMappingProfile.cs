using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Users;
using MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo;
using MusicMarket.Core.Enums;
using MusicMarket.Core.Models;
using System;

namespace MusicMarket.Application.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, GetUserInfoResponse>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(p => p.Surname))
                .ForMember(dest => dest.Login, opt => opt.MapFrom(p => p.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(p => p.Email))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(p => $"{Enum.GetName(typeof(StreetType), p.Address.StreetType)} {p.Address.StreetName}, {p.Address.StreetNumber}"));

            CreateMap<UserModel, User>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(p => p.Surname))
                .ForMember(dest => dest.Login, opt => opt.MapFrom(p => p.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(p => p.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(p => p.Password));
        }
    }
}
