using MediatR;
using MusicMarket.Application.OtherServices;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Users.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
    {
        private readonly IUserRepository _repo;
        public LoginCommandHandler(IUserRepository repo)
        {
            _repo = repo;
        }
        public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            string hashPassword = HashService.GetHashPassword(request.Password);

            bool doesExist = await _repo.HasTheSameDataForLogin(request.Input, hashPassword);

            if (!doesExist)
            {
                throw new BadRequestException("Check if you put the valid data!");
            }

            var user = await _repo.GetCertainUserByInput(request.Input);

            string token = JwtTokenProviderService.GenerateToken(user);


            return token;
        }
    }
}
