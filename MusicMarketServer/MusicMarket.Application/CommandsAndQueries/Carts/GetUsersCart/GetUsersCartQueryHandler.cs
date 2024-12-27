using AutoMapper;
using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Carts.GetUsersCart
{
    public class GetUsersCartQueryHandler : IRequestHandler<GetUsersCartQuery, List<GetUsersCartResponse>>
    {
        private readonly ICartRepository _repo;
        private readonly IMapper _mapper;

        public GetUsersCartQueryHandler(ICartRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<GetUsersCartResponse>> Handle(GetUsersCartQuery request, CancellationToken cancellationToken)
        {
            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            var data= await _repo.GetCardItems(UserID);

            var mappedData= _mapper.Map<List<GetUsersCartResponse>>(data);

            return mappedData;


        }
    }
}
