using System;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetLastUsersReview
{
    public class GetLastUsersReviewResponse
    {
        public string ProductName { get; set; }
        public int Mark { get; set; }
        public string ReviewDesc { get; set; }
    }
}
