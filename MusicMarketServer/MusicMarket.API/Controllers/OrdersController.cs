using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicMarket.Application.CommandsAndQueries.Orders.AddOrder;
using MusicMarket.Application.CommandsAndQueries.Orders.DeleteOrder;
using MusicMarket.Application.CommandsAndQueries.Orders.GetAllOrders;
using MusicMarket.Application.CommandsAndQueries.Orders.GetCertainOrderInfo;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("UserPolicy")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [Route("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetAllOrdersQuery query = new(HeaderData);
            var data = await _mediator.Send(query);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetCertainOrderInfo")]
        public async Task<IActionResult> GetCertainOrderInfo([FromQuery]GetCertainOrderInfoQuery query)
        {
            var data= await _mediator.Send(query);
            return Ok(data);
        }

        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> AddOrder(Guid ProductID)
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            AddOrderCommand command = new(HeaderData, ProductID);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteOrder")]
        public async Task<IActionResult> DeleteOrder([FromQuery] DeleteOrderCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}
