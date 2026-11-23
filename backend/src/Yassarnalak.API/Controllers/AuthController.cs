using Microsoft.AspNetCore.Mvc;
using Yassarnalak.Application.DTOs;
using Yassarnalak.Application.Interfaces;

namespace Yassarnalak.API.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
       
       public class AuthController : ControllerBase
        {
            private readonly IParentService _parentService;

            public AuthController(IParentService parentService)
            {
                _parentService = parentService;
            }

            [HttpPost("register/parent")]
            public async Task<IActionResult> RegisterParent(CreateParentDto dto)
            {
                await _parentService.RegisterParentAsync(dto);
                return Ok("Parent registered successfully");
            }
        }
    }

