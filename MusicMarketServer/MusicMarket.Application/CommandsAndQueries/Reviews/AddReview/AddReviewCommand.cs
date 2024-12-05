using MediatR;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.AddReview
{
    public record AddReviewCommand(ReviewModel ReviewModel, Guid ProductID, KeyValuePair<string, StringValues> HeaderData) : IRequest;
}
