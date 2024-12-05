using AutoMapper;
using FluentValidation;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.EditReview
{
    public class EditReviewCommandHandler : IRequestHandler<EditReviewCommand>
    {
        private readonly IReviewRepository _repo;
        private readonly IMapper _mapper;
        private readonly IValidator<Review> _validator;
        public EditReviewCommandHandler(IReviewRepository repo, IMapper mapper, IValidator<Review> validator)
        {
            _repo = repo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<Unit> Handle(EditReviewCommand request, CancellationToken cancellationToken)
        {
            var review= await _repo.GetReviewByID(request.ReviewID);
            if (review is null)
            {
                throw new NotFoundException("The review wasn't found");
            }

            var newReview = _mapper.Map<Review>(request.ReviewModel);
            
            var modelState= await _validator.ValidateAsync(newReview, cancellationToken);
            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n',modelState.Errors));
            }
            await _repo.ChangeReview(review, newReview);
            return Unit.Value;
        }
    }
}
