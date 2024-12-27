

using MusicMarket.Core.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicMarket.Infrastructure.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task AddCartItem(Cart CartItem);

        Task DeleteCartItem(Cart CartItem);

        Task<List<Cart>> GetCardItems(Guid UserID);

        Task<Cart> GetCartItemByID(Guid CardItemID);
    }
}
