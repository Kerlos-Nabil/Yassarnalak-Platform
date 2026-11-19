namespace Yassarnalak.Domain.Entities;

public class Child : ApplicationUser
{
    public string ParentId { get; set; } = null!;

    public string? DoctorId { get; set; }

    public string? SpecialistId { get; set; }

    public string? Nickname { get; set; }

    public DateOnly BirthDate { get; set; }

    public string Gender { get; set; } = null!;

    public string? Avatar { get; set; }

    public string? BirthCertificateUrl { get; set; }

    // Navigation Properties
    public Parent Parent { get; set; } = null!;

    public Doctor? Doctor { get; set; }

    public Specialist? Specialist { get; set; }
}
