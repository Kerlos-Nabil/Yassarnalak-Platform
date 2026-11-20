using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Infrastructure.Persistence.Configurations;

public class ChildConfiguration : IEntityTypeConfiguration<Child>
{
    public void Configure(EntityTypeBuilder<Child> builder)
    {
        builder.ToTable("child");

        builder.Property(c => c.ParentId)
            .HasColumnName("parent_id")
            .HasMaxLength(450)
            .IsRequired();

        builder.Property(c => c.DoctorId)
            .HasColumnName("doctor_id")
            .HasMaxLength(450);

        builder.Property(c => c.SpecialistId)
            .HasColumnName("specialist_id")
            .HasMaxLength(450);

        builder.Property(c => c.Nickname)
            .HasColumnName("nickname")
            .HasMaxLength(50);

        builder.Property(c => c.BirthDate)
            .HasColumnName("birth_date")
            .HasColumnType("date")
            .IsRequired();

        builder.Property(c => c.Gender)
            .HasColumnName("gender")
            .HasMaxLength(10)
            .IsRequired();

        builder.Property(c => c.Avatar)
            .HasColumnName("avatar")
            .HasMaxLength(255);

        builder.Property(c => c.BirthCertificateUrl)
            .HasColumnName("birth_certificate_url")
            .HasMaxLength(500);

        builder.HasOne(c => c.Parent)
            .WithMany(p => p.Children)
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(c => c.Doctor)
            .WithMany(d => d.Children)
            .HasForeignKey(c => c.DoctorId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(c => c.Specialist)
            .WithMany(s => s.Children)
            .HasForeignKey(c => c.SpecialistId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
