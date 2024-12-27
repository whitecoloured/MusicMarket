

using System;

namespace MusicMarket.Core.Models
{
    public class Cart
    {
        public Guid Id { get; set; }
        public User User { get; set; }
        public Guid? UserID { get; set; }
        public Product Product { get; set; }
        public Guid? ProductID { get; set; }
    }
}
