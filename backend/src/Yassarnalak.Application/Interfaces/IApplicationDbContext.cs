using Microsoft.EntityFrameworkCore;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<ApplicationUser> Users { get; }

    DbSet<Parent> Parents { get; }

    DbSet<Doctor> Doctors { get; }

    DbSet<Specialist> Specialists { get; }

    DbSet<Child> Children { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

