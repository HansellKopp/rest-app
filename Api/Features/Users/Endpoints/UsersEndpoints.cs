
using Api.Db;
using Api.EndpointDefinitions;
using Api.Validations;
using Microsoft.EntityFrameworkCore;

using Api.Features.Users.Dtos;
using Api.Features.Auth.Models;
using Microsoft.AspNetCore.Identity;
using Api.Features.Users.Models;

namespace Api.Features.Users.Endpoints;
public class UsersEndpointDefinition : IEndpointDefinition
{
    public void DefineEndpoints(WebApplication app)
    {
        var userGroup = app.MapGroup("/api/users")
            .RequireAuthorization()
            .WithGroupName("users");

        userGroup.MapGet("", GetAll);

        userGroup.MapGet($"/{{id}}", GetById);

        userGroup.MapPost("", Create);

        userGroup.MapPut("/profile", UpdateProfile);

        userGroup.MapPut($"/{{id}}", Update);

        userGroup.MapDelete($"/{{id}}", Delete);
    }

    public void DefineServices(IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    internal static async Task<IResult> GetAll(Dbc db)
    {
        var Users = await db.Users.ToListAsync();
        var UserDTOs = Users.Select(p => (UserDTO)p).ToList();
        return TypedResults.Ok(UserDTOs);
    }

    internal static async Task<IResult> GetById(Guid id, Dbc db)
    {
        var user = await db.Users.FindAsync(id.ToString());
        if (user is null) return TypedResults.NotFound();
        return TypedResults.Ok(((UserDTO)user));
    }

    internal static async Task<IResult> Update(Guid id, UserDTO userDTO, Dbc db)
    {
        var user = await db.Users.FindAsync(id.ToString());

        if (user is null) return TypedResults.NotFound();

        user.LastName = userDTO.LastName;
        user.Email = userDTO.Email;
        user.FirstName = userDTO.FirstName;
        user.PhoneNumber = userDTO.PhoneNumber;
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> UpdateProfile(UserDTO userDTO, Dbc db, UserManager<User> userManager,CurrentUser currentUser)
    {
        if (currentUser.Principal != null)
        {
            var current = await userManager.FindByNameAsync(currentUser.Id);
            if (current is null) return TypedResults.NotFound();
            var user = await db.Users.FirstAsync(p => p.UserName == current.Id);
            user.LastName = userDTO.LastName;
            user.Email = userDTO.Email;
            user.FirstName = userDTO.FirstName;
            user.PhoneNumber = userDTO.PhoneNumber;
            await db.SaveChangesAsync();
        }
        return TypedResults.NoContent();
    }

    internal static async Task<IResult> Delete(Guid id, Dbc db)
    {
        if (await db.Users.FindAsync(id.ToString()) is User user)
        {
            db.Users.Remove(user);
            await db.SaveChangesAsync();
            return TypedResults.NoContent();
        }

        return TypedResults.NotFound();
    }


    internal static async Task<IResult> Create(UserDTO newUser, UserManager<User> userManager)
    {
        var user = new User
        {
            UserName = newUser.UserName,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            PhoneNumber = newUser.PhoneNumber,
        };
        var result = await userManager.CreateAsync(user, newUser.Password);

        if (result.Succeeded)
        {
            return TypedResults.Ok();
        }

        return TypedResults.ValidationProblem(result.Errors.ToDictionary(e => e.Code, e => new[] { e.Description }));
    }
}