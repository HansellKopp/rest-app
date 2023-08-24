

using Api.EndpointDefinitions;
using Api.Features.Auth.Models;
using Api.Features.Auth.Services;
using Microsoft.AspNetCore.Identity;

namespace Api.Features.Auth.Endpoints;
public class AuthEndpointDefinition : IEndpointDefinition
{
    readonly String root = "/api";
    public void DefineEndpoints(WebApplication app)
    {
        app.MapPost($"{root}/auth", Authenticate);
        app.MapPost($"{root}/users", CreateUser);
        app.MapGet($"{root}/auth/me", GetCurrentUser);
    }

    public void DefineServices(IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    internal static async Task<IResult> GetCurrentUser(UserManager<User> userManager, CurrentUser currentUser)
    {
        if(currentUser.Principal != null)
        {
            var user = await userManager.FindByNameAsync(currentUser.Id);
            if(user !=null)
            {
                CurrentUserDTO me = new CurrentUserDTO
                {
                    UserName = user.UserName!,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    IsAdmin = currentUser.IsAdmin,
                    Email = user.Email!
                };
                return TypedResults.Ok(me);
            }

        }
        return TypedResults.BadRequest();
    }

    internal static async Task<IResult> CreateUser(CreateUserDTO newUser, UserManager<User> userManager)
    {
        var user = new User
        {
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            UserName = newUser.UserName,
        };
        var result = await userManager.CreateAsync(user, newUser.Password);

        if (result.Succeeded)
        {
            return TypedResults.Ok();
        }

        return TypedResults.ValidationProblem(result.Errors.ToDictionary(e => e.Code, e => new[] { e.Description }));
    }

    internal static async Task<IResult> Authenticate(SigninInfo userInfo, UserManager<User> userManager, ITokenService tokenService)
    {
        var user = await userManager.FindByNameAsync(userInfo.UserName);
        if (user is null || !await userManager.CheckPasswordAsync(user, userInfo.Password))
        {
            return TypedResults.BadRequest();
        }
        return TypedResults.Ok(new AuthToken(tokenService.GenerateToken(user.UserName!)));

    }
}