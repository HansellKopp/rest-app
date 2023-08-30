using FluentValidation;
using Api.Features.Products.Dtos;


namespace Api.Features.Products.Validators
{
	public class CategoryValidator : AbstractValidator<CategoryDTO>
	{
		public CategoryValidator()
		{
			RuleFor(p => p.Name).MaximumLength(2).NotEmpty();
		}
	}
}

