using AutoMapper;
using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetAllUsersReviews
{
    public class GetAllUsersReviewsHandler : IRequestHandler<GetAllUsersReviewsQuery, List<GetAllUsersReviewsResponse>>
    {
        private readonly IReviewRepository _repo;
        private readonly IMapper _mapper;
        public GetAllUsersReviewsHandler(IReviewRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<GetAllUsersReviewsResponse>> Handle(GetAllUsersReviewsQuery request, CancellationToken cancellationToken)
        {
            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);

            var data= await _repo.GetAllUsersReviews(UserID);

            var mappedData= _mapper.Map<List<GetAllUsersReviewsResponse>>(data);

            return mappedData;
        }
    }
}
