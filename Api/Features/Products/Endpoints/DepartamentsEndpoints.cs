using Api.Db;
using Api.EndpointDefinitions;
using Api.Features.Producs.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Features.Producs.Endpoints;

public class DepartamentsEndpointDefinition : IEndpointDefinition
{
    readonly String root = "/api/departaments";
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
        services.AddDbContext<Dbc>(opt => opt.UseInMemoryDatabase("products"));
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    internal static async Task<IResult> GetAll(Dbc db)
    {
        return TypedResults.Ok(await db.Departaments.ToListAsync());
    }

    internal static async Task<IResult> GetById(int id, Dbc db)
    {
        return Results.Ok(await db.Departaments.FindAsync(id)
                is Departament Departament
                    ? TypedResults.Ok((DepartamentDTO)Departament)
                    : TypedResults.NotFound());
    }

    internal static async Task<IResult> Create(DepartamentDTO DepartamentDTO, Dbc db)
    {
        var exist = db.Departaments.Where(b => b.Name == DepartamentDTO.Name).FirstOrDefault();
        if (exist != null)
        {
            return TypedResults.BadRequest("Departament name already exist");
        }
        var Departament = new Departament
        {
            Name = DepartamentDTO.Name,
        };
        db.Departaments.Add(Departament);

        await db.SaveChangesAsync();

        return TypedResults.Created($"/api/Departaments/{Departament.Id}", (DepartamentDTO)Departament);
    }

    internal static async Task<IResult> Update(int id, Departament inputDepartament, Dbc db)
    {
        var Departament = await db.Departaments.FindAsync(id);

        if (Departament is null) return TypedResults.NotFound();

        Departament.Name = inputDepartament.Name;

        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> Delete(int id, Dbc db)
    {
        if (await db.Departaments.FindAsync(id) is Departament Departament)
        {
            db.Departaments.Remove(Departament);
            await db.SaveChangesAsync();
            return TypedResults.Ok(Departament);
        }

        return TypedResults.NotFound();
    }

}