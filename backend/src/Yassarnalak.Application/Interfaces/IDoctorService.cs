using System;
using System.Collections.Generic;
using System.Text;
using Yassarnalak.Application.DTOs;

namespace Yassarnalak.Application.Interfaces
{
    public interface IDoctorService
    {

        Task CreateDoctorAsync(CreateDoctorDto doctorDto);
    }
}
