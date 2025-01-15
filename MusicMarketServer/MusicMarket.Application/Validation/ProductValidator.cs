using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(p => p.Name).NotEmpty().WithMessage("The name of product is empty!");

            When(p => p.Name is not null, () =>
            {
                RuleFor(p => p.Name)
                    .Must(p => p.StartsWith(p[..1].ToUpper()))
                    .WithMessage("The name must contain capital letter in the beggining!");
            }
            );

            RuleFor(p => p.Desc).NotEmpty().WithMessage("The description of product is empty!");

            When(p => p.Desc is not null, () =>
            {
                RuleFor(p => p.Desc)
                    .Must(p => p.StartsWith(p[..1].ToUpper()))
                    .WithMessage("The desc must contain capital letter in the beggining!");
            });

            RuleFor(p => p.Price).NotEmpty()
                .LessThan(10000.00m)
                .WithMessage("Put a valid price for the product!");

            RuleFor(p => p.Brand).NotNull()
                .WithMessage("Your brand must be specified!");

            RuleFor(p => p.Category).IsInEnum()
                .WithMessage("You haven't put any of the categories!");

            When(p => p.Characteristics?.Count != 0, () =>
            {
                RuleForEach(p => p.Characteristics)
                    .Must(p => p.Key?.Trim() != "")
                    .Must(p => p.Value?.Trim() != "")
                    .WithMessage("One or some of your keys or values aren't specified!");
            });


        }
    }
}
