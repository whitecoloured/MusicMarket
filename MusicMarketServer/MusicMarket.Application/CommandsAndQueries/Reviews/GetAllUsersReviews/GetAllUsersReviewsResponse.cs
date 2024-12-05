using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.GetAllUsersReviews
{
    public class GetAllUsersReviewsResponse
    {
        public Guid ID { get; set; }
        public string ProductName { get; set; }
        public string ProductImageURL { get; set; }
        public int Mark { get; set; }
        public string ReviewDesc { get; set; }
        public DateTime ReviewDate { get; set; }
    }
}
