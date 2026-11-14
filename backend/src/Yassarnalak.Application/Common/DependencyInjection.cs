using Microsoft.Extensions.DependencyInjection;

namespace Yassarnalak.Application.Common;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // Register Application layer services (mediator handlers, validators, mappers, etc.)
        return services;
    }
}
