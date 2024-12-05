using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using MusicMarket.Application.Mapping;
using MusicMarket.Application.Validation;
using MusicMarket.Core.Models;
using System.Reflection;

namespace MusicMarket.Application.DI
{
    public static class AppServicesRegistration
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IValidator<Brand>, BrandValidator>();
            services.AddScoped<IValidator<Address>, AddressValidator>();
            services.AddScoped<IValidator<Product>, ProductValidator>();
            services.AddScoped<IValidator<Review>, ReviewValidator>();
            services.AddScoped<IValidator<User>, UserValidator>();

            /*services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());*/
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(typeof(BrandMapperProfile), typeof(OrdersMapperProfile), typeof(ProductMapperProfile), typeof(ReviewMapperProfile), typeof(UserMappingProfile));

            return services;

        }
    }
}
