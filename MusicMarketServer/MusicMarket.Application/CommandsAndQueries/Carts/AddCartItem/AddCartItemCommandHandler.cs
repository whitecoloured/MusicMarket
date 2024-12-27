using MediatR;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Core.Models;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Carts.AddCartItem
{
    public class AddCartItemCommandHandler : IRequestHandler<AddCartItemCommand>
    {
        private readonly IUserRepository _userRepo;
        private readonly IProductRepository _productRepo;
        private readonly ICartRepository _cartRepo;

        public AddCartItemCommandHandler(IUserRepository userRepo, IProductRepository productRepo, ICartRepository cartRepo)
        {
            _userRepo = userRepo;
            _productRepo = productRepo;
            _cartRepo = cartRepo;
        }

        public async Task<Unit> Handle(AddCartItemCommand request, CancellationToken cancellationToken)
        {
            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);

            var product = await _productRepo.GetCertainProductByID(request.ProductID) ?? throw new NotFoundException("The product wasn't found!");
            var user=await _userRepo.GetCertainUserByID(UserID) ?? throw new NotFoundException("The user wasn't found!");

            var cartItem=new Cart() { Product=product, User=user };

            await _cartRepo.AddCartItem(cartItem);

            return Unit.Value;
        }
    }
}
