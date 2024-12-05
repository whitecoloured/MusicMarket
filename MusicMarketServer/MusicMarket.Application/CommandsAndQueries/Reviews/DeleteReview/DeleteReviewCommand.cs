using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.DeleteReview
{
    public record DeleteReviewCommand(Guid ReviewID) : IRequest;
}
