using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Infrastructure.Persistence.Configurations;

public class SpecialistConfiguration : IEntityTypeConfiguration<Specialist>
{
    public void Configure(EntityTypeBuilder<Specialist> builder)
    {
        builder.ToTable("specialist");

        builder.Property(s => s.Specialization)
            .HasColumnName("specialization")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(s => s.ExperienceYears)
            .HasColumnName("experience_years");

        builder.Property(s => s.Bio)
            .HasColumnName("bio")
            .HasColumnType("nvarchar(max)");

        builder.Property(s => s.VerificationStatus)
            .HasColumnName("verification_status")
            .HasMaxLength(20)
            .IsRequired()
            .HasDefaultValue("pending");

        builder.Property(s => s.AvgRating)
            .HasColumnName("avg_rating")
            .HasPrecision(3, 2);

        builder.HasMany(s => s.Children)
            .WithOne(c => c.Specialist)
            .HasForeignKey(c => c.SpecialistId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
