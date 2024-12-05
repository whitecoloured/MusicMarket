using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Context;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MusicMarket.Infrastructure.Repositories.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MMContext _context;

        public OrderRepository(MMContext context)
        {
            _context = context;
        }
        public async Task AddOrder(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrder(Order order)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Order>> GetAllUsersOrders(Guid UserID)
        {
            var data = await _context.Orders
                        .AsNoTracking()
                        .Include(p => p.Product)
                        .ThenInclude(p=> p.Brand)
                        .Where(p => p.UserID == UserID)
                        .ToListAsync();
            return data;
        }

        public async Task<Order> GetCertainOrderByID(Guid ID)
        {
            var data = await _context.Orders
                            .Include(p => p.Product)
                            .ThenInclude(p=> p.Brand)
                            .FirstOrDefaultAsync(p => p.Id == ID);

            return data;
        }
    }
}
