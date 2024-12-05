using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    class BrandValidator : AbstractValidator<Brand>
    {
        public BrandValidator()
        {
            RuleFor(p => p.BrandName).NotEmpty()
                .MaximumLength(50)
                .Must(p => !p.Contains('\n'))
                .WithMessage("You haven't set the brand name property or set it unproperly!");

        }
    }
}
