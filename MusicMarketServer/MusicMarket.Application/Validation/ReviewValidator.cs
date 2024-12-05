
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
                .MaximumLength(300)
                .When(p => p.ReviewDesc is not null)
                .WithMessage("The maxiumum length of the description is 300 characters!");
        }
    }
}
