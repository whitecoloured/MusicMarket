using MusicMarket.Core.Models;

namespace MusicMarket.Application.CommandsAndQueries.Users
{
    public record UserModel(string Name, string Surname, string Login, string Email, string Password, Address Address);
}
