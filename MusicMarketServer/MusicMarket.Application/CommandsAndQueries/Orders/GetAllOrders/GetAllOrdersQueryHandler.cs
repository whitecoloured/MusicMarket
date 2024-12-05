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

namespace MusicMarket.Application.CommandsAndQueries.Orders.GetAllOrders
{
    public class GetAllOrdersQueryHandler : IRequestHandler<GetAllOrdersQuery, List<OrderModelResponse>>
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IMapper _mapper;
        public GetAllOrdersQueryHandler(IOrderRepository orderRepo, IMapper mapper)
        {
            _orderRepo = orderRepo;
            _mapper = mapper;
        }
        public async Task<List<OrderModelResponse>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
        {
            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            var data = await _orderRepo.GetAllUsersOrders(UserID);

            var mappedData = _mapper.Map<List<OrderModelResponse>>(data);

            return mappedData;

            
        }
    }
}
