using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MusicMarket.Core.Models;

namespace MusicMarket.Infrastructure.Configs
{
    class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Role)
                .HasConversion<int>();

            builder
                .HasMany(p => p.Orders)
                .WithOne(p => p.User);

            builder
                .Property(p => p.Name)
                .IsRequired();

            builder
                .Property(p => p.Surname)
                .IsRequired();

            builder
                .Property(p => p.Login)
                .IsRequired();

            builder
                .Property(p => p.Email)
                .IsRequired();

            builder
                .Property(p => p.Password)
                .IsRequired();

            builder
                .OwnsOne(p => p.Address, a =>
                {
                    a.Property(p => p.StreetType)
                    .HasColumnName("StreetType")
                    .HasConversion<int>();

                    a.Property(p => p.StreetName)
                    .HasColumnName("StreetName");

                    a.Property(p => p.StreetNumber)
                    .HasColumnName("StreetNumber");
                });
        }
    }
}
