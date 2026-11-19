using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Infrastructure.Persistence.Configurations;

public class DoctorConfiguration : IEntityTypeConfiguration<Doctor>
{
    public void Configure(EntityTypeBuilder<Doctor> builder)
    {
        builder.ToTable("doctor");

        builder.Property(d => d.Specialty)
            .HasColumnName("specialty")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(d => d.ClinicName)
            .HasColumnName("clinic_name")
            .HasMaxLength(150);

        builder.Property(d => d.ClinicAddress)
            .HasColumnName("clinic_address")
            .HasMaxLength(255);

        builder.Property(d => d.ExperienceYears)
            .HasColumnName("experience_years");

        builder.Property(d => d.Bio)
            .HasColumnName("bio")
            .HasColumnType("nvarchar(max)");

        builder.Property(d => d.VerificationStatus)
            .HasColumnName("verification_status")
            .HasMaxLength(20)
            .IsRequired()
            .HasDefaultValue("pending");

        builder.Property(d => d.AvgRating)
            .HasColumnName("avg_rating")
            .HasPrecision(3, 2);

        builder.HasMany(d => d.Children)
            .WithOne(c => c.Doctor)
            .HasForeignKey(c => c.DoctorId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
