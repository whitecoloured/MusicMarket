using MediatR;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetAllUsersReviews
{
    public record GetAllUsersReviewsQuery(KeyValuePair<string, StringValues> HeaderData) :IRequest<List<GetAllUsersReviewsResponse>>;
}
