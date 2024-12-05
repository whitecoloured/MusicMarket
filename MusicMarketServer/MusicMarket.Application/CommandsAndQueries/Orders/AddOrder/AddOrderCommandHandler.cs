using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Core.Exceptions;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Orders.AddOrder
{
    public class AddOrderCommandHandler : IRequestHandler<AddOrderCommand>
    {
        private readonly IUserRepository _userRepo;
        private readonly IOrderRepository _orderRepo;
        private readonly IProductRepository _productRepo;
        public AddOrderCommandHandler(IUserRepository userRepo, IOrderRepository orderRepo, IProductRepository productRepo)
        {
            _userRepo = userRepo;
            _orderRepo = orderRepo;
            _productRepo = productRepo;
        }

        public async Task<Unit> Handle(AddOrderCommand request, CancellationToken cancellationToken)
        {
            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            
            var user = await _userRepo.GetCertainUserByID(UserID);

            var product = await _productRepo.GetCertainProductByID(request.ProductID);

            if (user is null || product is null)
            {
                throw new NotFoundException("The user or the product weren't found");
            }

            Order order = new() { Product=product, User=user};
            await _orderRepo.AddOrder(order);
            return Unit.Value;
        }
    }
}
