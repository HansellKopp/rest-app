using System.Reflection.Metadata.Ecma335;
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
        app.MapPost(root, Create);
        app.MapPut($"{root}/{{id}}", Update);
        app.MapDelete($"{root}/{{id}}", Delete);
    }

    public void DefineServices(IServiceCollection services)
    {
        services.AddDbContext<Dbc>(opt => opt.UseInMemoryDatabase("Products"));
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    internal static async Task<IResult> GetAll(Dbc db)
    {
        var products = await db.Products.ToListAsync();
        return TypedResults.Ok(products.ToList());
    }

    internal static async Task<IResult> GetById(int id, Dbc db)
    {
        return Results.Ok(await db.Products.FindAsync(id)
                is Product product
                    ? TypedResults.Ok((ProductDTO)product)
                    : TypedResults.NotFound());
    }

    internal static async Task<IResult> Create(ProductDTO ProductDTO, Dbc db)
    {
        var dep = db.Departaments.Find(ProductDTO.DepartamentId);
        if (dep == null)
        {
            return TypedResults.BadRequest();
        }

        var product = ProductDTO.ToProduct();
        product.Departament = dep;

        db.Products.Add(product);

        await db.SaveChangesAsync();

        return TypedResults.Created($"/api/products/{product.Id}", (ProductDTO)product);
    }

    internal static async Task<IResult> Update(int id, Product inputProduct, Dbc db)
    {
        var product = await db.Products.FindAsync(id);

        if (product is null) return TypedResults.NotFound();

        product.Name = inputProduct.Name;
        product.Tax = inputProduct.Tax;
        product.Price = inputProduct.Price;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> Delete(int id, Dbc db)
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