using FluentValidation;
using MusicMarket.Core.Models;

namespace MusicMarket.Application.Validation
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(p => p.Login).NotEmpty()
                .WithMessage("Your login input must be filled!");

            When(p => p.Login is not null, () =>
                RuleFor(p => p.Login)
                    .Must(c => c == c.ToLower())
                    .Must(p => !p.Contains(' '))
                    .Must(p => !p.Contains('\n'))
                    .WithMessage("Your login mustn't contain spaces and uppercase letters!")

            );

            RuleFor(p => p.Email).NotEmpty()
                .EmailAddress()
                .WithMessage("Your email input must be filled correctly!");

            When(p => p.Email is not null, () =>
                RuleFor(p=> p.Email)
                    .Must(c => c == c.ToLower())
                    .Must(p => !p.Contains(' '))
                    .Must(p => !p.Contains('\n'))
                    .WithMessage("Your email mustn't contain spaces and uppercase letters!")
            );

            RuleFor(p => p.Name).NotEmpty()
                .WithMessage("Your name must be filled!");

            When(p => p.Name is not null, () =>
                RuleFor(p => p.Name)
                    .Must(c => c.StartsWith(c[..1].ToUpper()))
                    .WithMessage("Your name must contain capital letter!")
            );

            RuleFor(p => p.Surname).NotEmpty()
                .WithMessage("Your surname must be filled!");

            When(p => p.Surname is not null, () =>
                RuleFor(p=> p.Surname)
                    .Must(c => c.StartsWith(c[..1].ToUpper()))
                    .WithMessage("Your surname must contain capital letter!")
            );

            RuleFor(p => p.Password).NotEmpty()
                .WithMessage("Your password must be filled!");

            When(p => p.Password is not null, () =>
                RuleFor(p=> p.Password)
                    .Must(p => !p.Contains(' '))
                    .Must(p => !p.Contains('\n'))
                    .MinimumLength(12)
                    .WithMessage("Your password mustn't contain spaces and less than 12 characters")
            );

            RuleFor(p => p.Address).SetValidator(new AddressValidator());
        }
    }
}
