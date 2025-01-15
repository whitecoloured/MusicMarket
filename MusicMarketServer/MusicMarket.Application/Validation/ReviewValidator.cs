
using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class ReviewValidator : AbstractValidator<Review>
    {
        public ReviewValidator()
        {
            RuleFor(p => p.Mark).NotEmpty().Must(p => p >= 0 && p <= 5)
                .WithMessage("Put a mark between 0 and 5!");

            RuleFor(p => p.ReviewDesc)
                .NotEmpty()
                .Length(10,300)
                .WithMessage("The description must be at length between 10 and 300 characters!");
        }
    }
}
