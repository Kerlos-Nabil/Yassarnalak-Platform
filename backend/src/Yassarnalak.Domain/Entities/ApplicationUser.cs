using Microsoft.AspNetCore.Identity;

namespace Yassarnalak.Domain.Entities;

public class ApplicationUser : IdentityUser
{
    public string FullName { get; set; } = null!;

    public string Status { get; set; } = "active";

    public string? Governorate { get; set; }

    public string? Area { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}
