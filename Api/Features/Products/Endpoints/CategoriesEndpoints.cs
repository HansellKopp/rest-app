using Api.Db;
using Api.EndpointDefinitions;
using Api.Features.Producs.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Producs.Endpoints;

public class CategoriesEndpointDefinition : IEndpointDefinition
{
    readonly String root = "/api/categories";
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
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    internal static async Task<IResult> GetAll(Dbc db)
    {
        var Categories = await db.Categories.ToListAsync();
        var CategoriesDTO = Categories.Select(p => (CategoryDTO)p).ToList();
        return TypedResults.Ok(CategoriesDTO);
    }

    internal static async Task<IResult> GetById(int id, Dbc db)
    {
        return Results.Ok(await db.Categories.FindAsync(id)
                is Category Category
                    ? TypedResults.Ok((CategoryDTO)Category)
                    : TypedResults.NotFound());
    }

    internal static async Task<IResult> Create(CategoryDTO CategoryDTO, Dbc db)
    {
        var exist = db.Categories.Where(b => b.Name == CategoryDTO.Name).FirstOrDefault();
        if (exist != null)
        {
            return TypedResults.BadRequest("Category name already exist");
        }
        var Category = new Category
        {
            Name = CategoryDTO.Name,
        };
        db.Categories.Add(Category);

        await db.SaveChangesAsync();

        return TypedResults.Created($"/api/Categories/{Category.Id}", (CategoryDTO)Category);
    }

    internal static async Task<IResult> Update(int id, Category inputCategory, Dbc db)
    {
        var Category = await db.Categories.FindAsync(id);

        if (Category is null) return TypedResults.NotFound();

        Category.Name = inputCategory.Name;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> Delete(int id, Dbc db)
    {
        if (await db.Categories.FindAsync(id) is Category Category)
        {
            db.Categories.Remove(Category);
            await db.SaveChangesAsync();
            return TypedResults.Ok(Category);
        }

        return TypedResults.NotFound();
    }

}