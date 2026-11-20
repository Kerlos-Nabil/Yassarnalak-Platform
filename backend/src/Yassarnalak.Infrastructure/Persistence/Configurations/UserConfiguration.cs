using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.UseTptMappingStrategy();

        builder.Property(u => u.FullName)
            .HasMaxLength(150)
            .IsRequired();

        builder.Property(u => u.Status)
            .HasMaxLength(20)
            .IsRequired()
            .HasDefaultValue("active");

        builder.Property(u => u.Governorate)
            .HasMaxLength(100);

        builder.Property(u => u.Area)
            .HasMaxLength(100);

        builder.Property(u => u.CreatedAt)
            .HasColumnType("datetimeoffset")
            .IsRequired();
    }
}
