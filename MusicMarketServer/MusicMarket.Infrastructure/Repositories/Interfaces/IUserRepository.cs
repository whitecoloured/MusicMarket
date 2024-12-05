using MusicMarket.Core.Models;
using System;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetCertainUserByID(Guid ID);

        Task<User> GetCertainUserByIDAsNoTracking(Guid ID);

        Task<User> GetCertainUserByInput(string Input);

        Task EditUserInfo(User user, User newUser);
        Task AddUser(User user);

        Task DeleteUser(User user);

        Task<bool> HasTheSameDataForRegister(string Email, string Login, string Password);
        Task<bool> HasTheSameDataForLogin(string Input, string Password);
        
        Task<bool> HasTheSameDataForEditing(User User, Guid UserID);
    }
}
