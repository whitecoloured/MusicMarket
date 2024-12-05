using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(p => p.Login).NotEmpty()
                .Must(c => c==c.ToLower())
                .Must(p=> !p.Contains(' '))
                .Must(p=> !p.Contains('\n'))
                .WithMessage("Your login input must be filled, without spaces and in lowercase!");

            RuleFor(p => p.Email).NotEmpty()
                .Must(c => c == c.ToLower())
                .EmailAddress()
                .WithMessage("Your email input must be filled correctly and in lowercase!");

            RuleFor(p => p.Name).NotEmpty()
                .Must(c => c.StartsWith(c.Substring(0, 1).ToUpper()))
                .WithMessage("Your name must be filled and contain a first letter in uppercase");

            RuleFor(p => p.Surname).NotEmpty()
                .Must(c => c.StartsWith(c.Substring(0, 1).ToUpper()))
                .WithMessage("Your surname must be filled and contain a first letter in uppercase");

            RuleFor(p => p.Password).NotEmpty()
                .Must(p=> !p.Contains(' '))
                .Must(p=> !p.Contains('\n'))
                .MinimumLength(12)
                .WithMessage("Your password must contain at least 12 characters!");

            RuleFor(p => p.Address).SetValidator(new AddressValidator());
        }
    }
}
