using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicMarket.Core.Models;


namespace MusicMarket.Infrastructure.Configs
{
    internal class CartConfig : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder
                .HasKey(e => e.Id);

            builder
                .HasOne(p => p.User)
                .WithMany(p => p.CartItems)
                .HasForeignKey(p => p.UserID);

            builder
                .HasOne(p => p.Product)
                .WithMany(p=> p.CartItems)
                .HasForeignKey(p=> p.ProductID);
        }
    }
}
