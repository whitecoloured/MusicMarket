using MusicMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo
{
    public record GetUserInfoResponse(Guid ID, string Name, string Surname, string Login, string Email, Address Address);
}
