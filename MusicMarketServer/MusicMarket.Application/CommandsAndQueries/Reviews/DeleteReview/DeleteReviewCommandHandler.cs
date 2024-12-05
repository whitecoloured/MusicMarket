using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.DeleteReview
{
    public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand>
    {
        private readonly IReviewRepository _repo;
        public DeleteReviewCommandHandler(IReviewRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
        {
            var review = await _repo.GetReviewByID(request.ReviewID);
            if (review is null)
            {
                throw new NotFoundException("The review wasn't found");
            }
            await _repo.DeleteReview(review);
            return Unit.Value;
        }
    }
}
