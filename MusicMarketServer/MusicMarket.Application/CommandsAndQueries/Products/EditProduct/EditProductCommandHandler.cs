using AutoMapper;
using FluentValidation;
using MediatR;
using MusicMarket.Core.Exceptions;
using MusicMarket.Core.Models;
using MusicMarket.Infrastructure.Repositories.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MusicMarket.Application.CommandsAndQueries.Products.EditProduct
{
    public class EditProductCommandHandler : IRequestHandler<EditProductCommand>
    {
        private readonly IProductRepository _productRepo;
        private readonly IBrandRepository _brandRepo;
        private readonly IMapper _mapper;
        private readonly IValidator<Product> _validator;
        public EditProductCommandHandler(IProductRepository repo, IMapper mapper, IValidator<Product> validator, IBrandRepository brandRepo)
        {
            _productRepo = repo;
            _mapper = mapper;
            _validator = validator;
            _brandRepo = brandRepo;
        }
        public async Task<Unit> Handle(EditProductCommand request, CancellationToken cancellationToken)
        {
            var brand=await _brandRepo.GetCertainBrandByID(request.Model.BrandID) ?? throw new NotFoundException("The brand hasn't been found!");
            var product = await _productRepo.GetCertainProductByID(request.ProductID) ?? throw new NotFoundException("The product hasn't been found!");
            var newProduct = _mapper.Map<Product>(request.Model);
            newProduct.Brand = brand;
            var modelState = await _validator.ValidateAsync(newProduct, cancellationToken);
            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n', modelState.Errors));
            }
            if (await _productRepo.HasTheProduct(newProduct, product.Id))
            {
                throw new BadRequestException("The product already exists!");
            }
            await _productRepo.EditProductInfo(product, newProduct);
            return Unit.Value;
        }
    }
}
