using Microsoft.AspNetCore.Mvc;
using MediatR;
using OlymppMarketsAPI.DTOs;
using OlymppMarketsAPI.Application.Commands;

namespace OlymppMarketsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;
        public AuthorizationController(IConfiguration configuration, IMediator mediator)
        {
            _configuration = configuration;
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO request)
        {
            var command = new LoginUserCommand
            {
                Username = request.Username,
                Password = request.Password
            };

            var token = await _mediator.Send(command);
            return Ok(new UserLoginResponseDTO { Token = token });

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterRequestDTO request)
        {
            var command = new RegisterUserCommand
            {
                Username = request.Username,
                Password = request.Password
            };

            var token = await _mediator.Send(command);
            return Ok(new UserLoginResponseDTO { Token = token });
        }   
    }
}
