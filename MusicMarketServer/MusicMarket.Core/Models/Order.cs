using System;

namespace MusicMarket.Core.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Product Product { get; set; }
        public Guid? ProductID { get; set; }
        public User User { get; set; }
        public Guid? UserID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime OrderReceived { get; set; }

        public Order()
        {
            OrderDate = DateTime.Now;
            OrderReceived = DateTime.Now.AddDays(6);
        }
    }
}
