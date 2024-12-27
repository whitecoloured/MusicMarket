using MediatR;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using MusicMarket.Core.Exceptions;
using System.Threading;
using System.Threading.Tasks;


namespace MusicMarket.Application.CommandsAndQueries.Carts.DeleteCartItem
{
    public class DeleteCartItemCommandHandler : IRequestHandler<DeleteCartItemCommand>
    {
        private readonly ICartRepository _repo;
        public DeleteCartItemCommandHandler(ICartRepository repo)
        {
            _repo = repo;
        }
        public async Task<Unit> Handle(DeleteCartItemCommand request, CancellationToken cancellationToken)
        {
            var cartItem = await _repo.GetCartItemByID(request.CartItemID) ?? throw new NotFoundException("The cart item wasn't found!");

            await _repo.DeleteCartItem(cartItem);

            return Unit.Value;
        }
    }
}
