
using MediatR;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetTopThreeReviews
{
    public record GetTopThreeReviewQuery(Guid ProductID, KeyValuePair<string, StringValues> HeaderData) : IRequest< GetTopThreeReviewsResponse>;
}
