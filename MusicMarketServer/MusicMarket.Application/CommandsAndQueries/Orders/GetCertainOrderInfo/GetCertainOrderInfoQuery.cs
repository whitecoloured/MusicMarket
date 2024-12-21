using MediatR;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Orders.GetCertainOrderInfo
{
    public record GetCertainOrderInfoQuery(Guid ID) : IRequest<GetCertainOrderInfoResponse>;
}
