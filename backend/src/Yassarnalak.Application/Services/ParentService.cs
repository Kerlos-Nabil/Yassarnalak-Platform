using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Yassarnalak.Application.DTOs;
using Yassarnalak.Application.Interfaces;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Application.Services
{
    internal class ParentService : IParentService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ParentService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task RegisterParentAsync(CreateParentDto dto)
        {
            var parent = new Parent
            {
                UserName = dto.Email,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                FullName = dto.FullName,
                Governorate = dto.Governorate,
                Area = dto.Area,
                Address = dto.Address,
                RelationType = dto.RelationType
            };

            var result = await _userManager.CreateAsync(parent, dto.Password);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }
    }
}

