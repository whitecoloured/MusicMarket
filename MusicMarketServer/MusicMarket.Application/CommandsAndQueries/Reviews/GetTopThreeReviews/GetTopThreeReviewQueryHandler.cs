

using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetTopThreeReviews
{
    public class GetTopThreeReviewQueryHandler : IRequestHandler<GetTopThreeReviewQuery, GetTopThreeReviewsResponse>
    {
        private readonly IReviewRepository _repo;
        public GetTopThreeReviewQueryHandler(IReviewRepository repo)
        {
            _repo = repo;
        }

        public async Task<GetTopThreeReviewsResponse> Handle(GetTopThreeReviewQuery request, CancellationToken cancellationToken)
        {
            var reviews = await _repo.GetAllReviewsAsList(request.ProductID);

            Guid? currentUserID = request.HeaderData.Key is not null ?
                JwtDataProviderService.GetUserIDFromToken(request.HeaderData) :
                null;

            int reviewAmount = reviews.Count;

            var mappedReviews=reviews
                                .Select(p=> p.ToGetReviewsResponse(currentUserID))
                                .Take(3)
                                .ToList();

            return new(mappedReviews, reviewAmount);
        }
    }
}
