using AutoMapper;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetProductInfoAdmin
{
    public class GetProductInfoAdminQueryHandler : IRequestHandler<GetProductInfoAdminQuery, GetProductInfoAdminResponse>
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;

        public GetProductInfoAdminQueryHandler(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<GetProductInfoAdminResponse> Handle(GetProductInfoAdminQuery request, CancellationToken cancellationToken)
        {
            var data = await _repo.GetCertainProductByIDAsNoTracking(request.ID) ?? throw new NotFoundException("The product wasn't found");

            var mappedData= _mapper.Map<GetProductInfoAdminResponse>(data);

            return mappedData;

        }
    }
}
