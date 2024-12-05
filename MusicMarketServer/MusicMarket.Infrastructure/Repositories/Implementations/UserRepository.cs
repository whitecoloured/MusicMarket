using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Context;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

namespace MusicMarket.Infrastructure.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly MMContext _context;

        public UserRepository(MMContext context)
        {
            _context = context;
        }
        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task EditUserInfo(User user, User newUser)
        {
            user.Name = newUser.Name;
            user.Surname = newUser.Surname;
            user.Password = newUser.Password;
            user.Login = newUser.Login;
            user.Address = newUser.Address;
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetCertainUserByID(Guid ID)
        {
            var data = await _context.Users.FindAsync(ID);

            return data;
        }

        public async Task<User> GetCertainUserByIDAsNoTracking(Guid ID)
        {
            var data = await _context.Users
                            .AsNoTracking()
                            .FirstOrDefaultAsync(p => p.Id == ID);

            return data;
        }

        public async Task<User> GetCertainUserByInput(string Input)
        {
            var data = await _context.Users.FirstOrDefaultAsync(p => p.Email == Input || p.Login == Input);
            return data;
        }

        public async Task<bool> HasTheSameDataForRegister(string Email, string Login, string Password)
        {
            return await _context.Users.AnyAsync(p => p.Email == Email || p.Login == Login || p.Password == Password);
        }

        public async Task<bool> HasTheSameDataForLogin(string Input, string Password)
        {
            return await _context.Users.AnyAsync(p => (p.Email == Input || p.Login == Input) && p.Password == Password);
        }

        public async Task<bool> HasTheSameDataForEditing(User User, Guid UserID)
        {
            return await _context.Users.AnyAsync(p => (p.Login == User.Login || p.Password == User.Password || p.Email==User.Email) && p.Id != UserID);
        }

    }
}
