using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Yassarnalak.Application.DTOs;
using Yassarnalak.Application.Interfaces;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Application.Services
{
    internal class DoctorService: IDoctorService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public DoctorService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task CreateDoctorAsync(CreateDoctorDto doctorDto)
        {
            var doctor = new Doctor
            {
                UserName = doctorDto.Email,
                Email = doctorDto.Email,
                FullName = doctorDto.FullName,
                Governorate = doctorDto.Governorate,
                Area = doctorDto.Area,
                Specialty = doctorDto.Specialty,
                ClinicName = doctorDto.ClinicName,
                ClinicAddress = doctorDto.ClinicAddress,
                ExperienceYears = doctorDto.ExperienceYears,
                Bio = doctorDto.Bio
            };

            var result = await _userManager.CreateAsync(doctor, doctorDto.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }


    }
}
