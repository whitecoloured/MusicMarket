using System;
using MediatR;

namespace MusicMarket.Application.CommandsAndQueries.Products.GetProductInfo
{
    public record GetProductInfoQuery(Guid ID) : IRequest<GetProductInfoResponse>;
}
