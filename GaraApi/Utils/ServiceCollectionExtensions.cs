using GaraApi.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GaraApi.Utils
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabaseService(this IServiceCollection services)
        {
            services.AddSingleton<AccessoryService>();
            return services;
        }
    }
}