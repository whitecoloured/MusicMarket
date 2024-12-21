using MusicMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        IQueryable<Review> GetAllReviews(Guid ProductID);

        IQueryable<Review> GetSortedReviews(IQueryable<Review> reviews, bool OrderByAsc, string SortItem);

        Task<List<Review>> GetConvertedToListReviews(IQueryable<Review> reviews);

        Task<List<Review>> GetAllReviewsAsList(Guid ProductID);

        Task<Review> GetReviewByID(Guid ReviewID);


        Task<List<Review>> GetAllUsersReviews(Guid UserID);

        Task AddReview(Review review);

        Task DeleteReview(Review review);

        Task ChangeReview(Review review, Review newReview);

    }
}
