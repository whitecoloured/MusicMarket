using MusicMarket.Core.Models;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetReviews
{
    public class GetReviewsResponse
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Mark { get; set; }
        public string ReviewDesc { get; set; }
        public DateTime ReviewDate { get; set; }
        public bool DoesBelongToUser { get; set; }
    }

    public static class ConverterToGetReviewsResponse
    {
        public static GetReviewsResponse ToGetReviewsResponse(this Review review, Guid? CurrentUserID)
        {
            return new()
            {
                ID = review.Id,
                Name = review.User.Name,
                Surname = review.User.Surname,
                Mark = review.Mark,
                ReviewDesc = review.ReviewDesc,
                ReviewDate = review.ReviewDate,
                DoesBelongToUser = review.UserID == CurrentUserID
            };
        }
    }
}
