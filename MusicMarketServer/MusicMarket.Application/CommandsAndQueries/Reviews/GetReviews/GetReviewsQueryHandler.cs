using AutoMapper;
using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetReviews
{
    public class GetReviewsQueryHandler : IRequestHandler<GetReviewsQuery, List<GetReviewsResponse>>
    {
        private readonly IReviewRepository _repo;
        private readonly IMapper _mapper;

        public GetReviewsQueryHandler(IReviewRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<List<GetReviewsResponse>> Handle(GetReviewsQuery request, CancellationToken cancellationToken)
        {

            var queryableData = _repo.GetAllReviews(request.ProductID);

            if (!string.IsNullOrWhiteSpace(request.SortItem))
            {
                queryableData = _repo.GetSortedReviews(queryableData, request.OrderByAsc, request.SortItem);
            }


            var reviews = await _repo.GetConvertedToListReviews(queryableData);

            Guid? currentUserID = request.HeaderData.Key is not null ?
                JwtDataProviderService.GetUserIDFromToken(request.HeaderData) :
                null;

            var mappedReviews = reviews.Select(
                r =>r.ToGetReviewsResponse(currentUserID)
                ).ToList();

            return mappedReviews;
        }
    }
}
