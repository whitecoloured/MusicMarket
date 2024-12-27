using MediatR;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetAllProductsAdmin
{
    public record GetAllProductsAdminQuery(string SearchName) : IRequest<List<GetAllProductsAdminResponse>>;
}
