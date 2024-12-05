using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicMarket.Core.Models;

namespace MusicMarket.Infrastructure.Configs
{
    class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .HasOne(p => p.Product)
                .WithMany(p => p.Orders)
                .HasForeignKey(p => p.ProductID);

            builder
                .HasOne(p => p.User)
                .WithMany(p => p.Orders)
                .HasForeignKey(p => p.UserID);


        }
    }
}
