using Microsoft.Extensions.DependencyInjection;
using MusicMarket.Infrastructure.Repositories.Implementations;
using MusicMarket.Infrastructure.Repositories.Interfaces;

namespace MusicMarket.Infrastructure.DI
{
    public static class InfraServicesRegistration
    {
        public static IServiceCollection AddInfraServices(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IReviewRepository, ReviewRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ICartRepository, CartRepository>();

            return services;
        }
    }
}
