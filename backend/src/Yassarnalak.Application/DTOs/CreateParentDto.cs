using System;
using System.Collections.Generic;
using System.Text;

namespace Yassarnalak.Application.DTOs
{
    public class CreateParentDto
    {
            public string FullName { get; set; } = null!;

            public string Email { get; set; } = null!;

            public string Password { get; set; } = null!;

            public string? PhoneNumber { get; set; }

            public string? Governorate { get; set; }
            public string? Area { get; set; }

            public string? Address { get; set; }
            public string? RelationType { get; set; }
        }
    }


