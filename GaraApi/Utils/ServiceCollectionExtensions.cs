using GaraApi.Entities;
using GaraApi.Interfaces;
using GaraApi.Services;
using GaraApi.Services.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace GaraApi.Utils
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabaseService(this IServiceCollection services)
        {
            services.AddSingleton<IGaraDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<GaraDatabaseSettings>>().Value);

            services.AddSingleton<AccessoryService>();
            services.AddSingleton<QuotationService>();
            services.AddSingleton<BillService>();
            services.AddSingleton<AccessoryIssueService>();
            services.AddSingleton<AccessoryReceiptService>();
            services.AddSingleton<RepairedRequestService>();
            services.AddSingleton<CustomerService>();
            services.AddSingleton<CarService>();
            services.AddSingleton<AccessoryTypeService>();
            services.AddSingleton<LaborCostService>();
            services.AddSingleton<ProviderService>();
            services.AddSingleton<ReferenceService>();

            services.AddSingleton<UserService>();
            services.AddSingleton<UserRoleService>();

            services.AddScoped<IAuthentication, AuthenticateService>();
            return services;
        }

        public static IServiceCollection AddConfigOptions(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<GaraDatabaseSettings>(config.GetSection(nameof(GaraDatabaseSettings)));
            services.Configure<AppSettings>(config.GetSection(nameof(AppSettings)));
            return services;
        }
    }
}