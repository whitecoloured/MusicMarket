using AutoMapper;
using MediatR;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProductsAdmin
{
    internal class GetAllProductsAdminQueryHandler : IRequestHandler<GetAllProductsAdminQuery, List<GetAllProductsAdminResponse>>
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;

        public GetAllProductsAdminQueryHandler(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;   
        }
        public async Task<List<GetAllProductsAdminResponse>> Handle(GetAllProductsAdminQuery request, CancellationToken cancellationToken)
        {
            var queryableData = _repo.GetAllProducts();

            if (!string.IsNullOrWhiteSpace(request.SearchName))
            {
                queryableData=_repo.GetFilteredBySearchNameProducts(queryableData, request.SearchName);
            }

            var data= await _repo.GetConvertedToListProducts(queryableData);

            var mappedData = _mapper.Map<List<GetAllProductsAdminResponse>>(data);

            return mappedData;
        }
    }
}
