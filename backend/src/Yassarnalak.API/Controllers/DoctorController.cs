using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
 
using Yassarnalak.Application.DTOs;
using Yassarnalak.Application.Interfaces;

namespace Yassarnalak.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateDoctor(CreateDoctorDto doctorDto)
        {
            await _doctorService.CreateDoctorAsync(doctorDto);

            return Ok("Doctor created successfully");
        }
    }
}
