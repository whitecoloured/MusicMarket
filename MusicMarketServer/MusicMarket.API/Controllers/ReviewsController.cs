using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicMarket.Application.CommandsAndQueries.Reviews;
using MusicMarket.Application.CommandsAndQueries.Reviews.AddReview;
using MusicMarket.Application.CommandsAndQueries.Reviews.DeleteReview;
using MusicMarket.Application.CommandsAndQueries.Reviews.EditReview;
using MusicMarket.Application.CommandsAndQueries.Reviews.GetAllUsersReviews;
using MusicMarket.Application.CommandsAndQueries.Reviews.GetReviews;
using MusicMarket.Application.CommandsAndQueries.Reviews.GetTopThreeReviews;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MusicMarket.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ReviewsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        [Route("GetReviews")]
        public async Task<IActionResult> GetAllReviews(Guid ProductID,bool OrderByAsc, string SortItem)
        {
            var headerData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetReviewsQuery query = new(ProductID, OrderByAsc, SortItem, headerData);
            var data = await _mediator.Send(query);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetTopThreeReviews")]
        public async Task<IActionResult> GetTopThreeReviews(Guid ProductID)
        {
            var headerData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetTopThreeReviewQuery query = new(ProductID, headerData);
            var data= await _mediator.Send(query);
            return Ok(data);
        }

        [HttpGet]
        [Route("GetAllUsersReviews")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> GetAllUsersReviews()
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            GetAllUsersReviewsQuery query = new(HeaderData);
            var data= await _mediator.Send(query);
            return Ok(data);
        }

        [HttpPost]
        [Route("AddReview")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> AddReview(ReviewModel review, Guid ProductID)
        {
            var HeaderData = Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            AddReviewCommand command= new(review, ProductID, HeaderData);
            await _mediator.Send(command);
            return Ok();
        }

        [HttpPut]
        [Route("EditReview")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> EditReview(EditReviewCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteReview")]
        [Authorize("UserPolicy")]
        public async Task<IActionResult> DeleteReview([FromQuery] DeleteReviewCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }
    }
}
