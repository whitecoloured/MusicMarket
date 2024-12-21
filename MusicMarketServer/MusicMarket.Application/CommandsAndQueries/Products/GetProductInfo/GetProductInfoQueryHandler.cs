using AutoMapper;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetProductInfo
{
    public class GetProductInfoQueryHandler : IRequestHandler<GetProductInfoQuery, GetProductInfoResponse>
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;

        public GetProductInfoQueryHandler(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<GetProductInfoResponse> Handle(GetProductInfoQuery request, CancellationToken cancellationToken)
        {
            var product = await _repo.GetCertainProductByIDAsNoTracking(request.ID) ?? throw new NotFoundException("The product you are looking for doesn't exist");
            var data = _mapper.Map<GetProductInfoResponse>(product);

            return data;
        }
    }
}
