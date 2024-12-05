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
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private readonly IValidator<Product> _validator;
        public EditProductCommandHandler(IProductRepository repo, IMapper mapper, IValidator<Product> validator)
        {
            _repo = repo;
            _mapper = mapper;
            _validator = validator;
        }
        public async Task<Unit> Handle(EditProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _repo.GetCertainProductByID(request.ProductID);
            var newProduct = _mapper.Map<Product>(request.Model);
            newProduct.Brand = product.Brand;
            var modelState = await _validator.ValidateAsync(newProduct, cancellationToken);
            if (!modelState.IsValid)
            {
                throw new BadRequestException(string.Join('\n', modelState.Errors));
            }
            /*if (await _repo.HasTheProduct(newProduct))
            {
                throw new BadRequestException("The product already exists!");
            }*/
            await _repo.EditProductInfo(product, newProduct);
            return Unit.Value;
        }
    }
}
