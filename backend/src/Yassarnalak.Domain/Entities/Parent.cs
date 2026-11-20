namespace Yassarnalak.Domain.Entities;

public class Parent : ApplicationUser
{
    public string? Address { get; set; }

    public string? RelationType { get; set; }

    public ICollection<Child> Children { get; set; } = new List<Child>();
}
