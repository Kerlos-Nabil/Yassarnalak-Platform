using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Infrastructure.Persistence.Configurations;

public class ParentConfiguration : IEntityTypeConfiguration<Parent>
{
    public void Configure(EntityTypeBuilder<Parent> builder)
    {
        builder.ToTable("parent");

        builder.Property(p => p.Address)
            .HasColumnName("address")
            .HasMaxLength(255);

        builder.Property(p => p.RelationType)
            .HasColumnName("relation_type")
            .HasMaxLength(30);

        builder.HasMany(p => p.Children)
            .WithOne(c => c.Parent)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
