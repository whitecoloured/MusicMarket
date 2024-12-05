

using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.EditReview
{
    public record EditReviewCommand(ReviewModel ReviewModel, Guid ReviewID) : IRequest;
}
