using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using MusicMarket.Application.OtherServices.JWT;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Users.DeleteUser
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand>
    {
        private readonly IUserRepository _repo;
        public DeleteUserCommandHandler(IUserRepository repo)
        {
            _repo = repo;
        }
        public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            Guid ID = JwtDataProviderService.GetUserIDFromToken(request.HeaderData);
            var user = await _repo.GetCertainUserByID(ID);
            if (user is null)
            {
                throw new NotFoundException("The user you are trying to delete wasn't found!");
            }
            await _repo.DeleteUser(user);
            return Unit.Value;
        }
    }
}
