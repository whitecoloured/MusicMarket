

using MusicMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Interfaces
{
    public interface IOrderRepository 
    {
        Task<List<Order>> GetAllUsersOrders(Guid UserID);

        Task<Order> GetCertainOrderByID(Guid ID);

        Task AddOrder(Order order);

        Task DeleteOrder(Order order);

    }
}
