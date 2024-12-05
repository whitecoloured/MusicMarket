using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MusicMarket.Infrastructure.Repositories.Interfaces;

namespace MusicMarket.Application.CommandsAndQueries.Brands.GetAllBrands
{
    class GetAllBrandsQueryHandler : IRequestHandler<GetAllBrandsQuery, List<GetAllBrandsResponse>>
    {
        private readonly IBrandRepository _repo;
        private readonly IMapper _mapper;
        public GetAllBrandsQueryHandler(IBrandRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<List<GetAllBrandsResponse>> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
        {
            var data = await _repo.GetAllBrands();
            var mappedData = _mapper.Map<List<GetAllBrandsResponse>>(data);
            return mappedData;
        }
    }
}
