using AutoMapper;
using MediatR;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts.Responses;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
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

            if (!string.IsNullOrWhiteSpace(request.SearchName))
            {
                queryableData = _repo.GetFilteredBySearchNameProducts(queryableData, request.SearchName);
            }

            if (request.BrandIDs is not null)
            {
                if (request.BrandIDs.Any())
                {
                    queryableData = _repo.GetFilteredByBrandProducts(queryableData, request.BrandIDs);
                }
            }

            if (request.Categories is not null)
            {
                if (request.Categories.Any())
                {
                    queryableData = _repo.GetFilteredByCategoryProducts(queryableData, request.Categories);
                }
            }

            if (request.FirstPrice is not null && request.SecondPrice is not null)
            {
                queryableData = _repo.GetFilteredByPriceRangeProducts(queryableData, request.FirstPrice, request.SecondPrice);
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
