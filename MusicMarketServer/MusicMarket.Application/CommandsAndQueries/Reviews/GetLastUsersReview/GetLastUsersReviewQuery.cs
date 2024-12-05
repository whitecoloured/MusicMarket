using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetLastUsersReview
{
    public record GetLastUsersReviewQuery(KeyValuePair<string,StringValues> HeaderData) :IRequest<GetLastUsersReviewResponse>;
}
