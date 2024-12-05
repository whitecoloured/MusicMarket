using MusicMarket.Core.Enums;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Orders
{
    public class OrderModelResponse
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string BrandName { get; set; }
        public ProductCategory Category { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime OrderReceived { get; set; }
    }
}
