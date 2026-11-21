using System;
using System.Collections.Generic;
using System.Text;

namespace Yassarnalak.Application.DTOs
{
    public class CreateDoctorDto
    {
        public string FullName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string? Governorate { get; set; }
        public string? Area { get; set; }

        public string Specialty { get; set; } = null!;
        public string? ClinicName { get; set; }
        public string? ClinicAddress { get; set; }
        public short? ExperienceYears { get; set; }
        public string? Bio { get; set; }
    }
}
