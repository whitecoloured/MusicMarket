using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using FluentValidation;
using MusicMarket.Core.Models;
using MusicMarket.Core.Exceptions;

namespace MusicMarket.Application.CommandsAndQueries.Products.AddProduct
{
    public class AddProductCommandHandler : IRequestHandler<AddProductCommand>
    {
        private readonly IProductRepository _productRepo;
        private readonly IBrandRepository _brandRepo;
        private readonly IMapper _mapper;
        private readonly IValidator<Product> _validator;

        public AddProductCommandHandler(IProductRepository productRepo, IBrandRepository brandRepo, IMapper mapper, IValidator<Product> validator)
        {
            _productRepo = productRepo;
            _brandRepo = brandRepo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<Unit> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            var brand = await _brandRepo.GetCertainBrandByID(request.Model.BrandID)?? throw new NotFoundException("The brand hasn't been found!");
            var product = _mapper.Map<Product>(request.Model);
            product.Brand = brand;
            var modelState = await _validator.ValidateAsync(product, cancellationToken);
            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n', modelState.Errors));
            }
            await _productRepo.AddProduct(product);
            return Unit.Value;
        }
    }
}
