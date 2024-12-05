using AutoMapper;
using FluentValidation;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Brands.AddBrand
{
    class AddBrandCommandHandler : IRequestHandler<AddBrandCommand>
    {
        private readonly IBrandRepository _repo;
        private readonly IMapper _mapper;
        private readonly IValidator<Brand> _validator;
        public AddBrandCommandHandler(IBrandRepository repo, IMapper mapper, IValidator<Brand> validator)
        {
            _repo = repo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<Unit> Handle(AddBrandCommand request, CancellationToken cancellationToken)
        {
            if (await _repo.HasTheBrand(request.BrandName))
            {
                throw new BadRequestException("The brand already exists!");
            }
            var brand = _mapper.Map<Brand>(request);
            var modelState = await _validator.ValidateAsync(brand, cancellationToken);
            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n', modelState.Errors));
            }
            await _repo.AddBrand(brand);
            return Unit.Value;
        }
    }
}
