using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Context;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace MusicMarket.Infrastructure.Repositories.Implementations
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly MMContext _context;

        public ReviewRepository(MMContext context)
        {
            _context = context;
        }
        public async Task AddReview(Review review)
        {
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
        }

        public async Task ChangeReview(Review review, Review newReview)
        {
            review.Mark = newReview.Mark;
            review.ReviewDesc = newReview.ReviewDesc;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteReview(Review review)
        {
            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();
        }

        public async Task<Review> GetReviewByID(Guid ReviewID)
        {
            var data= await _context.Reviews.FindAsync(ReviewID);
            return data;
        }

        public IQueryable<Review> GetAllReviews(Guid ProductID)
        {
            var data = _context.Reviews
                            .AsNoTracking()
                            .Where(p => p.ProductID == ProductID)
                            .Include(p => p.User)
                            .AsQueryable();
            return data;
        }

        public async Task<List<Review>> GetConvertedToListReviews(IQueryable<Review> reviews)
        {
            return await reviews.ToListAsync();
        }

        public IQueryable<Review> GetSortedReviews(IQueryable<Review> reviews, bool OrderByAsc, string SortItem)
        {
            Expression<Func<Review, object>> orderKey = SortItem switch
            {
                "mark" => p => p.Mark,
                _ => p => p.ReviewDate
            };

            var sortedData = OrderByAsc ? reviews.OrderBy(orderKey) : reviews.OrderByDescending(orderKey);
            return sortedData;
        }

        public async Task<List<Review>> GetAllUsersReviews(Guid UserID)
        {
            var data= await _context.Reviews
                            .AsNoTracking()
                            .Include(p=> p.Product)
                            .Where(p=> p.UserID==UserID)
                            .OrderByDescending(p=> p.ReviewDate)
                            .ToListAsync();
            return data;
        }

        public async Task<List<Review>> GetAllReviewsAsList(Guid ProductID)
        {
            var data = await _context.Reviews
                        .AsNoTracking()
                        .Include(p => p.User)
                        .Where(p => p.ProductID == ProductID)
                        .OrderByDescending(p => p.ReviewDate)
                        .ToListAsync();

            return data;
        }
    }
}
