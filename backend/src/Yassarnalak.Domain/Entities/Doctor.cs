namespace Yassarnalak.Domain.Entities;

public class Doctor : ApplicationUser
{
    public string Specialty { get; set; } = null!;

    public string? ClinicName { get; set; }

    public string? ClinicAddress { get; set; }

    public short? ExperienceYears { get; set; }

    public string? Bio { get; set; }

    public string VerificationStatus { get; set; } = "pending";

    public decimal? AvgRating { get; set; }

    public ICollection<Child> Children { get; set; } = new List<Child>();
}
