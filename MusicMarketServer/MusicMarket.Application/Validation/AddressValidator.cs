using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class AddressValidator : AbstractValidator<Address>
    {
        public AddressValidator()
        {
            RuleFor(p => p.StreetName).NotEmpty()
                .WithMessage("Your street name must be filled!");

            When(p => !string.IsNullOrWhiteSpace(p.StreetName), () =>
                RuleFor(p => p.StreetName).Must(c => c.StartsWith(c[..1].ToUpper()))
                    .WithMessage("Your street name must start with first letter in uppercase!")
            );

            RuleFor(p => p.StreetType).IsInEnum()
                .WithMessage("Define your street type properly!");

            RuleFor(p => p.StreetNumber).NotEmpty()
                .WithMessage("Your street number must be filled!");
        }
    }
}
