using MusicMarket.Core.Models;

namespace MusicMarket.Application.CommandsAndQueries.Users.Register
{
    public record UserModel(string Name, string Surname, string Login, string Email, string Password, Address Address);
}
