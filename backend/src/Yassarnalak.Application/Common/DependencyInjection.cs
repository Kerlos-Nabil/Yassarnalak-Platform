using Microsoft.Extensions.DependencyInjection;
using Yassarnalak.Application.Interfaces;
using Yassarnalak.Application.Services;

namespace Yassarnalak.Application.Common;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register Application layer services (mediator handlers, validators, mappers, etc.)
        services.AddScoped<IDoctorService, DoctorService>();
        services.AddScoped<IParentService, ParentService>();

        return services;
    }
}
