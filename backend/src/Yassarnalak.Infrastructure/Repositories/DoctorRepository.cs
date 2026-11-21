using System;
using System.Collections.Generic;
using System.Text;
using Yassarnalak.Application.Interfaces;
using Yassarnalak.Domain.Entities;
 
namespace Yassarnalak.Infrastructure.Repositories
{
    internal class DoctorRepository: IDoctorRepository
    {
        private readonly IApplicationDbContext _context;

        public DoctorRepository(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Doctor doctor)
        {
            await _context.Doctors.AddAsync(doctor);
            await _context.SaveChangesAsync();
        }


    }
}
