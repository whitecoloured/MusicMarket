

using MediatR;

namespace MusicMarket.Application.CommandsAndQueries.Brands.AddBrand
{
    public record AddBrandCommand(string BrandName) : IRequest;
}
