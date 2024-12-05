using AutoMapper;
using MediatR;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts
{
    public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, DisplayProductsResponse>
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        public GetAllProductsQueryHandler(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<DisplayProductsResponse> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            var queryableData = _repo.GetAllProducts();

            if (request.BrandID is not null)
            {
                queryableData = _repo.GetFilteredByBrandProducts(queryableData, request.BrandID.Value);
            }

            if (request.Category is not null)
            {
                queryableData = _repo.GetFilteredByCategoryProducts(queryableData, request.Category.Value);
            }

            if (request.Prices is not null)
            {
                queryableData = _repo.GetFilteredByPriceRangeProducts(queryableData, request.Prices.Value.Item1, request.Prices.Value.Item2);
            }

            if (!string.IsNullOrWhiteSpace(request.SortItem))
            {
                queryableData = _repo.GetSortedProducts(queryableData, request.OrderByAsc, request.SortItem);
            }

            int productsAmount = queryableData.Count();

            queryableData = _repo.GetProductsByPage(queryableData, request.Page);

            var productsList = await _repo.GetConvertedToListProducts(queryableData);

            var data = _mapper.Map<List<GetAllProductsResponse>>(productsList);


            return new DisplayProductsResponse(data, productsAmount);


        }
    }
}
