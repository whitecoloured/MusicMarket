using MediatR;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Brands.GetAllBrands
{
    public class GetAllBrandsQuery : IRequest<List<GetAllBrandsResponse>>
    {
    }
}
