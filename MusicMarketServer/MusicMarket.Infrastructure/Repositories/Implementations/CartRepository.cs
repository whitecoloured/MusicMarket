using Microsoft.EntityFrameworkCore;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Context;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Implementations
{
    public class CartRepository : ICartRepository
    {
        private readonly MMContext _context;

        public CartRepository(MMContext context)
        {
            _context = context;
        }

        public async Task AddCartItem(Cart CartItem)
        {
            await _context.Carts.AddAsync(CartItem);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCartItem(Cart CartItem)
        {
            _context.Carts.Remove(CartItem);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Cart>> GetCardItems(Guid UserID)
        {
            var data = await _context.Carts
                            .AsNoTracking()
                            .Include(p=> p.Product)
                            .Where(p => p.UserID == UserID)
                            .ToListAsync();

            return data;
        }

        public async Task<Cart> GetCartItemByID(Guid CardItemID)
        {
            var data = await _context.Carts.FindAsync(CardItemID);

            return data;
        }
    }
}
