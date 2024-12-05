using MediatR;
using System;

namespace MusicMarket.Application.CommandsAndQueries.Brands.DeleteBrand
{
    public record DeleteBrandCommand(Guid ID) : IRequest;
}
