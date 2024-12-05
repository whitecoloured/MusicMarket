using MediatR;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetReviews
{
    public record GetReviewsQuery(Guid ProductID, bool OrderByAsc, string SortItem, KeyValuePair<string, StringValues> HeaderData): IRequest<List<GetReviewsResponse>>;
}
