using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(p => p.Name).NotEmpty().WithMessage("The name of product is empty!");

            RuleFor(p => p.Desc).NotEmpty().WithMessage("The description of product is empty!");

            RuleFor(p => p.Price).NotEmpty()
                .LessThan(10000.00m)
                .WithMessage("Put a valid price for the product!");

            RuleFor(p => p.Brand).NotNull()
                .WithMessage("Your brand must be specified!");

            RuleFor(p => p.Category).NotNull()
                .WithMessage("You haven't put any of the categories!");

        }
    }
}
