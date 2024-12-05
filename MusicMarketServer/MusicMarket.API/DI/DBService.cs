using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MusicMarket.Infrastructure.Context;

namespace MusicMarket.API.DI
{
    public static class DBService
    {
        public static IServiceCollection AddDBService(this IServiceCollection services, IConfiguration Configuration)
        {
            services.AddDbContext<MMContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Database"),
                b => b.MigrationsAssembly("MusicMarket.Infrastructure")));

            return services;
        }
    }
}
