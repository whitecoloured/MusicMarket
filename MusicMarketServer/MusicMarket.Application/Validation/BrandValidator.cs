using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    class BrandValidator : AbstractValidator<Brand>
    {
        public BrandValidator()
        {
            RuleFor(p => p.BrandName).NotEmpty()
                .WithMessage("Your brand name must be filled!");

            When(p => p.BrandName is not null, () =>
                RuleFor(p=> p.BrandName)
                    .MaximumLength(50)
                    .Must(p => !p.Contains('\n'))
                    .WithMessage("The brand name should have only under 50 characters!")
            );

        }
    }
}
