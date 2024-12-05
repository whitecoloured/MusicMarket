using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class AddressValidator : AbstractValidator<Address>
    {
        public AddressValidator()
        {
            RuleFor(p => p.StreetName).NotEmpty().Must(c => c.StartsWith(c.Substring(0, 1).ToUpper()))
                .WithMessage("Your street name must be fulfilled and start with an uppercase letter!");
        }
    }
}
