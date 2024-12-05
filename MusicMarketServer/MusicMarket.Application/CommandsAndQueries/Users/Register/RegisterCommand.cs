using MediatR;

namespace MusicMarket.Application.CommandsAndQueries.Users.Register
{
    public record RegisterCommand(UserModel UserModel) : IRequest<string>;
}
