using MediatR;
using AutoMapper;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using MusicMarket.Core.Models;
using FluentValidation;
using MusicMarket.Core.Exceptions;
using System;
using MusicMarket.Application.OtherServices.JWT;

namespace MusicMarket.Application.CommandsAndQueries.Reviews.AddReview
{
    public class AddReviewCommandHandler : IRequestHandler<AddReviewCommand>
    {
        private readonly IReviewRepository _reviewRepo;
        private readonly IProductRepository _productRepo;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly IValidator<Review> _validator;

        public AddReviewCommandHandler(IReviewRepository reviewRepo, IProductRepository productRepo, IUserRepository userRepo,IMapper mapper, IValidator<Review> validator)
        {
            _reviewRepo = reviewRepo;
            _productRepo = productRepo;
            _userRepo = userRepo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<Unit> Handle(AddReviewCommand request, CancellationToken cancellationToken)
        {
            var review = _mapper.Map<Review>(request.ReviewModel);

            var modelState = await _validator.ValidateAsync(review, cancellationToken);

            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n',modelState.Errors));
            }

            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);

            var product = await _productRepo.GetCertainProductByID(request.ProductID);

            var user = await _userRepo.GetCertainUserByID(UserID);

            review.Product = product;
            review.User = user;

            await _reviewRepo.AddReview(review);

            return Unit.Value;
        }
    }
}
