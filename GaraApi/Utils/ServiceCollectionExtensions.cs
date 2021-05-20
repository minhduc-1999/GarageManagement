using GaraApi.Services;
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

            return services;
        }
    }
}