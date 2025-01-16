using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicMarket.Application.CommandsAndQueries.Users.DeleteUser;
using MusicMarket.Application.CommandsAndQueries.Users.EditPassword;
using MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo;
using MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo;
using MusicMarket.Application.CommandsAndQueries.Users.GetUserRole;
using MusicMarket.Application.CommandsAndQueries.Users.Login;
using MusicMarket.Application.CommandsAndQueries.Users.Register;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("GetUserInfo")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> GetUserInfo()
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetUserInfoQuery query = new (HeaderData);
            var data = await _mediator.Send(query);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetUserRole")]
        [Authorize("UserPolicy")]
        public IActionResult GetUserRole()
        {
            var headerData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetUserRoleQuery query = new(headerData);
            var role = _mediator.Send(query).Result;
            return Ok(role);
        }

        [HttpPut]
        [Route("EditUserInfo")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> EditUserInfo(UserEditModel model)
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            EditUserInfoCommand command = new(model, HeaderData);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpPatch]
        [Route("EditPassword")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> EditPassword(string oldPassword, string newPassword)
        {
            var headerData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            EditPasswordCommand command=new(oldPassword, newPassword, headerData);
            await _mediator.Send(command);
            return Ok();

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            var data=await _mediator.Send(command);
            return Ok(data);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterCommand command)
        {
            string token = await _mediator.Send(command);
            return Ok(token);
        }

        [HttpDelete]
        [Route("DeleteUser")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> DeleteUser()
        {
            var HeaderData = Request.Headers.FirstOrDefault(x=> x.Key=="Authorization");
            DeleteUserCommand command = new(HeaderData);
            await _mediator.Send(command);
            return Ok();
        }
    }
}
