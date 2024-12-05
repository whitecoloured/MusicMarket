using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicMarket.Application.CommandsAndQueries.Users;
using MusicMarket.Application.CommandsAndQueries.Users.DeleteUser;
using MusicMarket.Application.CommandsAndQueries.Users.EditUserInfo;
using MusicMarket.Application.CommandsAndQueries.Users.GetUserInfo;
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

        [HttpPut]
        [Route("EditUserInfo")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> EditUserInfo(UserModel model)
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            EditUserInfoCommand command = new(model, HeaderData);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            string token=await _mediator.Send(command);
            return Ok(token);
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
