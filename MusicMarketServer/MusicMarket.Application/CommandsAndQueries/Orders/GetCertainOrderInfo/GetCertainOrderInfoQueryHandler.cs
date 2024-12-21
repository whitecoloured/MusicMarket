using AutoMapper;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Orders.GetCertainOrderInfo
{
    public class GetCertainOrderInfoQueryHandler : IRequestHandler<GetCertainOrderInfoQuery, GetCertainOrderInfoResponse>
    {
        private readonly IOrderRepository _repo;
        private readonly IMapper _mapper;
        
        public GetCertainOrderInfoQueryHandler(IOrderRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<GetCertainOrderInfoResponse> Handle(GetCertainOrderInfoQuery request, CancellationToken cancellationToken)
        {
            var order = await _repo.GetCertainOrderByID(request.ID) ?? throw new NotFoundException("The order wasn't found");
            var mappedData = _mapper.Map<GetCertainOrderInfoResponse>(order);

            return mappedData;
        }
    }
}
