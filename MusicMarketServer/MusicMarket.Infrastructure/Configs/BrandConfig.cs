using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicMarket.Core.Models;

namespace MusicMarket.Infrastructure.Configs
{
    class BrandConfig : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .HasMany(p => p.Products)
                .WithOne(p => p.Brand);

            builder
                .Property(p => p.BrandName)
                .IsRequired();
        }
    }
}
