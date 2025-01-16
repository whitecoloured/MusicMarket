using MusicMarket.Core.Models;

namespace MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo
{
    public class UserEditModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public Address Address { get; set; }
    }
}
