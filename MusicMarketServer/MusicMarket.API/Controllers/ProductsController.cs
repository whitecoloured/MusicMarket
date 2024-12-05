using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MediatR;
using MusicMarket.Application.CommandsAndQueries.Products.GetAllProducts;
using MusicMarket.Application.CommandsAndQueries.Products.AddProduct;
using MusicMarket.Application.CommandsAndQueries.Products.EditProduct;
using MusicMarket.Application.CommandsAndQueries.Products.GetProductInfo;
using MusicMarket.Application.CommandsAndQueries.Products.DeleteProduct;
using System.Threading;
using Microsoft.AspNetCore.Authorization;

namespace MusicMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [Route("GetProducts")]
        public async Task<IActionResult> GetAllProducts([FromQuery]GetAllProductsQuery query)
        {
            var data = await _mediator.Send(query);
            return Ok(data);
        }
        [HttpGet]
        [Route("GetProductInfo")]
        public async Task<IActionResult> GetProductInfo([FromQuery]GetProductInfoQuery query)
        {
            var data = await _mediator.Send(query);
            return Ok(data);
        }
        [HttpPost]
        [Route("AddProduct")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> AddProduct(AddProductCommand command, CancellationToken ct)
        {
            await _mediator.Send(command, ct);
            return Ok();
        }
        [HttpPut]
        [Route("EditProduct")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> EditProduct(EditProductCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
        [HttpDelete]
        [Route("DeleteProduct")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> DeleteProduct([FromQuery]DeleteProductCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}
