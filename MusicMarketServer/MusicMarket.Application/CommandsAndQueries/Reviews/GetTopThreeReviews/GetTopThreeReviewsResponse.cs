

using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetTopThreeReviews
{
    public record GetTopThreeReviewsResponse(List<GetReviewsResponse> Reviews, int AllReviewsAmount);
}
