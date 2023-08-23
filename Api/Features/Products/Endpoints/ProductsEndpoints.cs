
using Api.Db;
using Api.EndpointDefinitions;
using Api.Features.Producs.Dtos;
using Api.Features.Producs.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Producs.Endpoints;
public class ProductsEndpointDefinition : IEndpointDefinition
{
    readonly String root = "/api/products";
    public void DefineEndpoints(WebApplication app)
    {
        app.MapGet(root, GetAll);
        app.MapGet($"{root}/{{id}}", GetById);
        app.MapPost(root, Create).RequireAuthorization();
        app.MapPut($"{root}/{{id}}", Update).RequireAuthorization();
        app.MapDelete($"{root}/{{id}}", Delete).RequireAuthorization();
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