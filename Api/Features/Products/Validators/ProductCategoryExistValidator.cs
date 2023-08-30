using Api.Db;
using Api.Features.Products.Dtos;

namespace Api.Features.Products.Validators;

public class ProductCategoryExist: IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
    {
        var entity = ctx.Arguments
            .OfType<ProductDTO>()
            .FirstOrDefault(a => a?.GetType() == typeof(ProductDTO));

        if (entity is null)
        {
            return Results.Problem("Could not find product category to validate");
        }
        var myDb = ctx.HttpContext.RequestServices.GetService<Dbc>();
        var category = await myDb!.Categories.FindAsync(entity.Category.Id);
        if (category is null)
        {
            var problem = new Dictionary<string, string[]>
            {
                { "category", new string[] { "Invalid product category" } }
            };
            return Results.ValidationProblem(problem);
        }
        return await next(ctx);
    }
}
