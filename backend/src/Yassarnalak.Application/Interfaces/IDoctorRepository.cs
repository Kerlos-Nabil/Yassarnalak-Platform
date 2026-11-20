using System;
using System.Collections.Generic;
using System.Text;
using Yassarnalak.Domain.Entities;

namespace Yassarnalak.Application.Interfaces
{
    public  interface IDoctorRepository
    {
        Task AddAsync(Doctor doctor);
    }
}
