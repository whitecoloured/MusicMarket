using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicMarket.Core.Models;
using System.Collections.Generic;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using System;

namespace MusicMarket.Infrastructure.Configs
{
    class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .HasOne(p => p.Brand)
                .WithMany(p => p.Products)
                .HasForeignKey(p => p.BrandID);

            builder
                .HasMany(p => p.Reviews)
                .WithOne(p => p.Product);

            builder
                .HasMany(p => p.Orders)
                .WithOne(p => p.Product);

            builder
                .Property(p => p.Name)
                .IsRequired();

            builder
                .Property(p => p.Desc)
                .IsRequired();

            builder
                .Property(p => p.Price)
                .HasPrecision(6, 2);

            builder
                .Property(p => p.Characteristics)
                .HasConversion(
                data => JsonConvert.SerializeObject(data),
                data => JsonConvert.DeserializeObject<List<KeyValuePair<string, string>>>(data),
                new ValueComparer<List<KeyValuePair<string, string>>>(
                    (f,n)=> f.SequenceEqual(n),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => c.ToList()
                    )
                );
        }
    }
}
