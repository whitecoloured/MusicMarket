using System;


namespace MusicMarket.Application.CommandsAndQueries.Carts.GetUsersCart
{
    public class GetUsersCartResponse
    {
        public Guid ID { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public Guid ProductID { get; set; }
    }
}
