using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicMarket.Core.Models;

namespace MusicMarket.Infrastructure.Configs
{
    class ReviewConfig : IEntityTypeConfiguration<Review>
    {
        public void Configure(EntityTypeBuilder<Review> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .HasOne(p => p.Product)
                .WithMany(p => p.Reviews)
                .HasForeignKey(p => p.ProductID);

            builder
                .HasOne(p => p.User)
                .WithMany(p => p.Reviews)
                .HasForeignKey(p => p.UserID);

        }
    }
}
