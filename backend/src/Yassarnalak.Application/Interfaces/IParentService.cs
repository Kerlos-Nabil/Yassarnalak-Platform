using System;
using System.Collections.Generic;
using System.Text;
using Yassarnalak.Application.DTOs;

namespace Yassarnalak.Application.Interfaces
{
    public interface IParentService
    {
        Task RegisterParentAsync(CreateParentDto dto);
    }
}
