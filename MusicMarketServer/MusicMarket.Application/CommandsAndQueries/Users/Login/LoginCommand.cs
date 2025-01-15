using MediatR;

namespace MusicMarket.Application.CommandsAndQueries.Users.Login
{
    public record LoginCommand(string Input, string Password) : IRequest<string>;
}
