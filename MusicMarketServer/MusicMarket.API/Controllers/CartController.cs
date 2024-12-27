using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicMarket.Application.CommandsAndQueries.Carts.AddCartItem;
using MusicMarket.Application.CommandsAndQueries.Carts.DeleteCartItem;
using MusicMarket.Application.CommandsAndQueries.Carts.GetUsersCart;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("UserPolicy")]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("GetAllCartItems")]
        public async Task<IActionResult> GetAllCartItems()
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetUsersCartQuery query = new(HeaderData);
            var data= await _mediator.Send(query);

            return Ok(data);
        }

        [HttpPost]
        [Route("AddCartItem")]
        public async Task<IActionResult> AddCartItem(Guid ProductID)
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            AddCartItemCommand command=new(ProductID, HeaderData);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCartItem")]
        public async Task<IActionResult> DeleteCartItem(DeleteCartItemCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}
