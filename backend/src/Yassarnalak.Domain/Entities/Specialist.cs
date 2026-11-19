namespace Yassarnalak.Domain.Entities;

public class Specialist : ApplicationUser
{
    public string Specialization { get; set; } = null!;
    public short? ExperienceYears { get; set; }

    public string? Bio { get; set; }

    public string VerificationStatus { get; set; } = "pending";

    public decimal? AvgRating { get; set; }

    public ICollection<Child> Children { get; set; } = new List<Child>();
}
