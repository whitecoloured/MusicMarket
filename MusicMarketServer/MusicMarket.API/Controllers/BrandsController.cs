using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicMarket.Application.CommandsAndQueries.Brands.AddBrand;
using MusicMarket.Application.CommandsAndQueries.Brands.DeleteBrand;
using MusicMarket.Application.CommandsAndQueries.Brands.GetAllBrands;
using System.Threading.Tasks;

namespace MusicMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public BrandsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [Route("GetAllBrands")]
        public async Task<IActionResult> GetAllBrands()
        {
            GetAllBrandsQuery query = new();
            var data = await _mediator.Send(query);
            return Ok(data);
        }

        [HttpPost]
        [Route("AddBrand")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> AddBrand(AddBrandCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteBrand")]
        [Authorize("AdminPolicy")]
        public async Task<IActionResult> DeleteBrand([FromQuery]DeleteBrandCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}
