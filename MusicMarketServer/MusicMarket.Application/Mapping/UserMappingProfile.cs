using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo;
using MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo;
using MusicMarket.Application.CommandsAndQueries.Users.Register;
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
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(p => p.Surname))
                .ForMember(dest => dest.Login, opt => opt.MapFrom(p => p.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(p => p.Email))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(p => p.Address));

            CreateMap<UserModel, User>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(p => p.Surname))
                .ForMember(dest => dest.Login, opt => opt.MapFrom(p => p.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(p => p.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(p => p.Password))
                .ForMember(dest=> dest.Address, opt=> opt.MapFrom(p=> p.Address));

            CreateMap<UserEditModel, User>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(p => p.Name))
                .ForMember(dest => dest.Surname, opt => opt.MapFrom(p => p.Surname))
                .ForMember(dest => dest.Login, opt => opt.MapFrom(p => p.Login))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(p => p.Email))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(p => p.Address));
        }
    }
}
