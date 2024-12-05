using AutoMapper;
using FluentValidation;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using MusicMarket.Application.OtherServices.JWT;
using System;
using System.Threading;
using System.Threading.Tasks;
using MusicMarket.Application.OtherServices;

namespace MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo
{
    public class EdtiUserCommandHandler : IRequestHandler<EditUserInfoCommand>
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IValidator<User> _validator;
        public EdtiUserCommandHandler(IUserRepository repo, IMapper mapper, IValidator<User> validator)
        {
            _repo = repo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<Unit> Handle(EditUserInfoCommand request, CancellationToken cancellationToken)
        {
            Guid ID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            var user = await _repo.GetCertainUserByID(ID);

            var newUser = _mapper.Map<User>(request.UserModel);

            var modelState = await _validator.ValidateAsync(newUser, cancellationToken);

            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n', modelState.Errors));
            }

            string hashPassword=HashService.GetHashPassword(newUser.Password);

            newUser.Password = hashPassword;

            if (await _repo.HasTheSameDataForEditing(newUser, ID))
            {
                throw new BadRequestException("You can't put the data as it already exists!");
            }


            await _repo.EditUserInfo(user, newUser);

            return Unit.Value;
        }
    }
}
