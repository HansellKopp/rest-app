
using Api.EndpointDefinitions;
using Api.Features.Users.Dtos;
using Api.Features.Auth.Services;

namespace Api.Features.Users.Endpoints;
public class UsersEndpointDefinition : IEndpointDefinition
{
    public void DefineEndpoints(WebApplication app)
    {
        var userGroup = app.MapGroup("/api/users")
            //.RequireAuthorization()
            .WithGroupName("users");

        userGroup.MapGet("", GetAll);

        userGroup.MapGet("/profile", GetProfile);

        userGroup.MapGet($"/{{id}}", GetById);

        userGroup.MapPost("", Create);

        userGroup.MapPut("/profile", UpdateProfile);

        userGroup.MapPut($"/{{id}}", Update);

        userGroup.MapDelete($"/{{id}}", Delete);
    }

    public void DefineServices(IServiceCollection services)
    { 
    }

    internal static async Task<IResult> GetAll(IUsersService users)
    {
        var u = await users.GetAll();
        return TypedResults.Ok(u.Select(p=> (UserDTO)p).ToList());
    }

    internal static async Task<IResult> GetById(Guid id, IUsersService users)
    {
        var user = await users.GetById(id.ToString());
        if (user is null) return TypedResults.NotFound();
        return TypedResults.Ok(((UserDTO)user));
    }

    internal static async Task<IResult> Update(Guid id, UserDTO userDTO, IUsersService users)
    {
        var success = await users.Update(id.ToString(), userDTO);

        if (!success) return TypedResults.NotFound();

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> GetProfile(IUsersService users, CurrentUser currentUser)
    {
        if (currentUser.Principal is null)
        {
            return TypedResults.BadRequest();
        }
        var user = await users.GetProfile(currentUser);
        if (user is null)
        {
            return TypedResults.NotFound();
        }
        return TypedResults.Ok((user));
    }    

    internal static async Task<IResult> UpdateProfile(UserDTO userDTO, CurrentUser currentUser, IUsersService users)
    {
        if (currentUser.Principal is null)
        {
            return TypedResults.BadRequest();
        }
        var result = await users.UpdateProfile(currentUser, userDTO);
        if(result == false)
        {
          return TypedResults.BadRequest();
        }

        return TypedResults.NoContent();
    }

    internal static async Task<IResult> Delete(Guid id, IUsersService users)
    {
        var result = await users.Delete(id.ToString());
        if(result)
        {
            return TypedResults.NoContent();
        }
        return TypedResults.NotFound();
    }


    internal static async Task<IResult> Create(CreateUserDTO newUser, IUsersService users)
    {
        var result = await users.Add(newUser);
        if (result.Succeeded)
        {
            return TypedResults.Ok();
        }

        return TypedResults.ValidationProblem(result.Errors.ToDictionary(e => e.Code, e => new[] { e.Description }));
    }
}