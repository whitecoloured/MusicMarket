using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Infrastructure.Repositories.Interfaces;

namespace MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo
{
    class GetUserInfoQueryHandler : IRequestHandler<GetUserInfoQuery, GetUserInfoResponse>
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public GetUserInfoQueryHandler(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<GetUserInfoResponse> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
        {
            Guid ID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            var user = await _repo.GetCertainUserByIDAsNoTracking(ID);
            var data = _mapper.Map<GetUserInfoResponse>(user);
            return data;
        }
    }
}
