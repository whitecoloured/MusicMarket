

using AutoMapper;
using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetLastUsersReview
{

    public class GetLastUsersReviewQueryHandler : IRequestHandler<GetLastUsersReviewQuery, GetLastUsersReviewResponse>
    {
        private readonly IReviewRepository _repo;
        private readonly IMapper _mapper;
        public GetLastUsersReviewQueryHandler(IReviewRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<GetLastUsersReviewResponse> Handle(GetLastUsersReviewQuery request, CancellationToken cancellationToken)
        {
            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            var data = await _repo.GetLastUsersReview(UserID);
            var mappedData= _mapper.Map<GetLastUsersReviewResponse>(data);
            return mappedData;
        }
    }
}
