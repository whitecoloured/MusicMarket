using System;


namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetAllUsersReviews
{
    public class GetAllUsersReviewsResponse
    {
        public Guid ID { get; set; }
        public string ProductName { get; set; }
        public int Mark { get; set; }
        public string ReviewDesc { get; set; }
        public DateTime ReviewDate { get; set; }
    }
}
