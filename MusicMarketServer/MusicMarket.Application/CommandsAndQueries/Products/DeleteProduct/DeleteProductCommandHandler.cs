using System.Threading;
using System.Threading.Tasks;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;

namespace MusicMarket.Application.CommandsAndQueries.Products.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
    {
        private readonly IProductRepository _repo;
        public DeleteProductCommandHandler(IProductRepository repo)
        {
            _repo = repo;
        }
        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var data = await _repo.GetCertainProductByID(request.ID);
            if (data is null)
            {
                throw new NotFoundException("The product hasn't been found!");
            }
            await _repo.DeleteProduct(data);
            return Unit.Value;
        }
    }
}
