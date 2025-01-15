using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetProductInfoAdmin
{
    public record GetProductInfoAdminQuery(Guid ID) : IRequest<GetProductInfoAdminResponse>;
}
