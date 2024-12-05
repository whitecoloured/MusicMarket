using AutoMapper;
using FluentValidation;
using MediatR;
using MusicMarket.Application.OtherServices;
using MusicMarket.Application.OtherServices.JWT;
using MusicMarket.Core.Exceptions;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Users.Register
{
    class RegisterCommandHandler : IRequestHandler<RegisterCommand, string>
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IValidator<User> _validator;

        public RegisterCommandHandler(IUserRepository repo, IMapper mapper, IValidator<User> validator)
        {
            _repo = repo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {

            var user = _mapper.Map<User>(request.UserModel);

            var modelState = await _validator.ValidateAsync(user, cancellationToken);

            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n', modelState.Errors));
            }    

            var hashPassword = HashService.GetHashPassword(user.Password);

            bool doesExist = await _repo.HasTheSameDataForRegister(user.Email, user.Login, hashPassword);

            if (doesExist)
            {
                throw new BadRequestException("A user with the data already exists!");
            }

            user.Password=hashPassword;

            await _repo.AddUser(user);

            var checkUser = await _repo.GetCertainUserByInput(user.Login);

            string token = JwtTokenProviderService.GenerateToken(checkUser);

            return token;

        }
    }
}
