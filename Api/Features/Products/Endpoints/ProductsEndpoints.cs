
using Api.Db;
using Api.EndpointDefinitions;
using Api.Features.Products.Dtos;
using Api.Features.Products.Models;
using Api.Features.Products.Validators;
using Api.Validations;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Products.Endpoints;
public class ProductsEndpointDefinition : IEndpointDefinition
{
    public void DefineEndpoints(WebApplication app)
    {
        var productGroup = app.MapGroup("/api/products")
            .RequireAuthorization()
            .WithGroupName("products");

        productGroup.MapGet("", GetAll);

        productGroup.MapGet($"/{{id}}", GetById);

        productGroup.MapPost("", Create)
            .AddEndpointFilter<ProductCategoryExist>()
            .AddEndpointFilter<ValidationFilter<ProductDTO>>();
            

        productGroup.MapPut($"/{{id}}", Update)
            .AddEndpointFilter<ValidationFilter<ProductDTO>>();

        productGroup.MapDelete($"/{{id}}", Delete);
    }

    public void DefineServices(IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    internal static async Task<IResult> GetAll(Dbc db)
    {
        var products = await db.Products.Include(b => b.Category).ToListAsync();
        var productDtos = products.Select(p => (ProductDTO)p).ToList();
        return TypedResults.Ok(productDtos);
    }

    internal static async Task<IResult> GetById(Guid id, Dbc db)
    {
        var product = await db.Products.FindAsync(id);
        if (!(product is Product)) return TypedResults.NotFound();
        var category = await db.Categories.FindAsync(product.CategoryId);
        return TypedResults.Ok((ProductDTO)product);
    }

    internal static async Task<IResult> Create(ProductDTO ProductDTO, Dbc db)
    {
        var dep = db.Categories.Find(ProductDTO.Category.Id);
        if (dep == null)
        {
            return TypedResults.BadRequest();
        }

        var product = ProductDTO.ToProduct();
        product.Category = dep;

        db.Products.Add(product);

        await db.SaveChangesAsync();

        return TypedResults.Created($"/api/products/{product.Id}", (ProductDTO)product);
    }

    internal static async Task<IResult> Update(Guid id, Product inputProduct, Dbc db)
    {
        var product = await db.Products.FindAsync(id);

        if (product is null) return TypedResults.NotFound();

        product.Name = inputProduct.Name;
        product.Tax = inputProduct.Tax;
        product.Price = inputProduct.Price;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> Delete(Guid id, Dbc db)
    {
        if (await db.Products.FindAsync(id) is Product product)
        {
            db.Products.Remove(product);
            await db.SaveChangesAsync();
            return TypedResults.Ok(product);
        }

        return TypedResults.NotFound();
    }

}