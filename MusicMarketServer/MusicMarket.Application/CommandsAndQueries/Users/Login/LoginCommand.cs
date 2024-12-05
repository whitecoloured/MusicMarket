using MediatR;

namespace MusicMarket.Application.CommandsAndQueries.Users.Login
{
    //We should return out of the command a token 
    public record LoginCommand(string Input, string Password) : IRequest<string>;
}
