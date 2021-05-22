using GaraApi.Services;
using GaraApi.Services.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace GaraApi.Utils
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabaseService(this IServiceCollection services)
        {
            services.AddSingleton<AccessoryService>();
            services.AddSingleton<QuotationService>();
            services.AddSingleton<BillService>();
            services.AddSingleton<AccessoryIssueService>();
            services.AddSingleton<AccessoryReceiptService>();
            services.AddSingleton<RepairedRequestService>();

            services.AddSingleton<UserService>();
            services.AddSingleton<UserRoleService>();
            return services;
        }
    }
}