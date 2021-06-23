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
            services.AddScoped<IGaraDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<GaraDatabaseSettings>>().Value);

            services.AddScoped<AccessoryService>();
            //services.AddScoped<QuotationService>();
            services.AddScoped<BillService>();
            services.AddScoped<AccessoryIssueService>();
            services.AddScoped<AccessoryReceiptService>();
            services.AddScoped<RepairedRequestService>();
            services.AddScoped<CustomerService>();
            services.AddScoped<CarService>();
            services.AddScoped<AccessoryTypeService>();
            services.AddScoped<LaborCostService>();
            services.AddScoped<ProviderService>();
            services.AddScoped<ReferenceService>();

            services.AddScoped<UserService>();
            services.AddScoped<UserRoleService>();

            services.AddScoped<IAuthentication, AuthenticateService>();
            services.AddScoped<IAccountService, AccountService>();
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