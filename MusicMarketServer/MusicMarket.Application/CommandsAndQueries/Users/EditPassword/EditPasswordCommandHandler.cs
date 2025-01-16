using MediatR;
using MusicMarket.Application.OtherServices;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Users.EditPassword
{
    public class EditPasswordCommandHandler : IRequestHandler<EditPasswordCommand>
    {
        private readonly IUserRepository _repo;

        public EditPasswordCommandHandler(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditPasswordCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.CheckPassword) || string.IsNullOrWhiteSpace(request.NewPassword))
            {
                throw new BadRequestException("The data is empty!");
            }

            Guid UserID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);

            var user = await _repo.GetCertainUserByID(UserID) ?? throw new NotFoundException("The user wasn't found");

            var hashedCheckPassword = HashService.GetHashPassword(request.CheckPassword);

            if (!await _repo.IsUserPasswordCorrect(hashedCheckPassword, UserID))
            {
                throw new BadRequestException("The old password you entered isn't correct!");
            }

            if (request.NewPassword.Contains(" ") || request.NewPassword?.Length < 12)
            {
                throw new BadRequestException("The password mustn't contain spaces and be less than 12 characters!");
            }

            var hashedNewPassword = HashService.GetHashPassword(request.NewPassword);

            if (await _repo.DoesUserWithThePasswordExists(hashedNewPassword))
            {
                throw new BadRequestException("User with the password already exists!");
            }

            await _repo.EditPassword(user, hashedNewPassword);

            return Unit.Value;


        }
    }
}
