using AutoMapper;
using MusicMarket.Application.CommandsAndQueries.Reviews;
using MusicMarket.Application.CommandsAndQueries.Reviews.GetAllUsersReviews;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Mapping
{
    public class ReviewMapperProfile : Profile
    {
        public ReviewMapperProfile()
        {
            CreateMap<ReviewModel, Review>()
                .ForMember(dest => dest.Mark, opt => opt.MapFrom(p => p.Mark))
                .ForMember(dest => dest.ReviewDesc, opt => opt.MapFrom(p => p.ReviewDesc));


            CreateMap<Review, GetAllUsersReviewsResponse>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(p => p.Id))
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(p => p.Product.Name))
                .ForMember(dest => dest.ProductImageURL, opt => opt.MapFrom(p => p.Product.ImageURL))
                .ForMember(dest => dest.Mark, opt => opt.MapFrom(p => p.Mark))
                .ForMember(dest => dest.ReviewDesc, opt => opt.MapFrom(p => p.ReviewDesc))
                .ForMember(dest => dest.ReviewDate, opt => opt.MapFrom(p => p.ReviewDate));
        }
    }
}
