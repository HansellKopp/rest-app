

using Api.EndpointDefinitions;
using Api.Features.Auth.Models;
using Api.Features.Auth.Services;
using Microsoft.AspNetCore.Identity;

namespace Api.Features.Users.Endpoints;

public class AuthEndpointDefinition : IEndpointDefinition
{
    readonly String root = "/api";
    public void DefineEndpoints(WebApplication app)
    {
        app.MapPost($"{root}/auth", Authenticate);
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

    internal static async Task<IResult> Authenticate(SigninInfo userInfo, UserManager<User> userManager, ITokenService tokenService, IConfiguration config)
    {
        var minutes = int.Parse(config["Authentication:DurationMinutes"] ?? "1");
        var user = await userManager.FindByNameAsync(userInfo.UserName);
        if (user is null || !await userManager.CheckPasswordAsync(user, userInfo.Password))
        {
            return TypedResults.BadRequest();
        }
        return TypedResults.Ok(new AuthToken(tokenService.GenerateToken(user.UserName!, DateTime.UtcNow.AddMinutes(minutes))));

    }
}