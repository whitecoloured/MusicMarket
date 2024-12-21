using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Orders.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand>
    {
        private readonly IOrderRepository _repo;
        public DeleteOrderCommandHandler(IOrderRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _repo.GetCertainOrderByID(request.ID) ?? throw new NotFoundException("The order wasn't found");
            await _repo.DeleteOrder(order);
            return Unit.Value;
        }
    }
}
