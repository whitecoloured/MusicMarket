using AutoMapper;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Orders.GetCertainOrderInfo
{
    public class GetCertainOrderInfoQueryHandler : IRequestHandler<GetCertainOrderInfoQuery, OrderModelResponse>
    {
        private readonly IOrderRepository _repo;
        private readonly IMapper _mapper;
        
        public GetCertainOrderInfoQueryHandler(IOrderRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<OrderModelResponse> Handle(GetCertainOrderInfoQuery request, CancellationToken cancellationToken)
        {
            var order = await _repo.GetCertainOrderByID(request.ID);
            
            if (order is null)
            {
                throw new NotFoundException("The order wasn't found");
            }

            var mappedData= _mapper.Map<OrderModelResponse>(order);

            return mappedData;
        }
    }
}
