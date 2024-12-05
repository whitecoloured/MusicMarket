using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Brands.DeleteBrand
{
    public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand>
    {
        private readonly IBrandRepository _repo;
        public DeleteBrandCommandHandler(IBrandRepository repo)
        {
            _repo = repo;
        }
        public async Task<Unit> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _repo.GetCertainBrandByID(request.ID);
            if (brand is null)
            {
                throw new NotFoundException("The brand you want to delete doesn't exist!");
            }
            await _repo.DeleteBrand(brand);
            return Unit.Value;
        }
    }
}
