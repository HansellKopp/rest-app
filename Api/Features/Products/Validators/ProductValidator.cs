using FluentValidation;
using Api.Features.Products.Dtos;

namespace Api.Features.Products.Validators
{
	public class ProductValidator : AbstractValidator<ProductDTO>
    {
		public ProductValidator()
		{
			RuleFor(p => p.Category).NotEmpty();
			RuleFor(p => p.Name).MinimumLength(2).NotEmpty();
		}
	}
}

