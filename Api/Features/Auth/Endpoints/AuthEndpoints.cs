
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
        app.MapGet($"{root}/auth/refresh-token", RefreshToken);
    }

    public void DefineServices(IServiceCollection services)
    {
        services.AddDatabaseDeveloperPageExceptionFilter();
    }

    public async Task<IResult> RefreshToken(HttpContext context, UserManager<User> userManager, CurrentUser currentUser, ITokenService tokenService, IUsersService users)
    {
        var Request = context.Request;
        var refreshToken = Request.Cookies["refreshToken"];

        if (refreshToken is null)
        {
            return TypedResults.Unauthorized(); // Refresh token is not present
        }

        var user = await users.GetByRefreshToken(refreshToken);
        if (user == null)
        {
            return TypedResults.Unauthorized(); // Invalid user
        }
        if (user.TokenExpires < DateTime.Now)
        {
            return TypedResults.Unauthorized(); // Invalid Token
        }
        var token = tokenService.GenerateToken(user);
        var newRefreshToken = tokenService.GenerateRefreshToken();
        tokenService.SetRefreshToken(context.Response, newRefreshToken);
        await users.SetRefreshToken(user, newRefreshToken);
        return TypedResults.Ok(token);
    }

    internal static async Task<IResult> GetCurrentUser(IUsersService users, CurrentUser currentUser)
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

    internal static async Task<IResult> Authenticate(SigninInfo userInfo, UserManager<User> userManager, ITokenService tokenService, HttpContext context, IUsersService users)
    {
        var user = await userManager.FindByNameAsync(userInfo.UserName);
        if (user is null || !await userManager.CheckPasswordAsync(user, userInfo.Password))
        {
            return TypedResults.BadRequest();
        }
        var token = tokenService.GenerateToken(user);

        var newRefreshToken = tokenService.GenerateRefreshToken();
        tokenService.SetRefreshToken(context.Response, newRefreshToken);
        await users.SetRefreshToken(user, newRefreshToken);
        return TypedResults.Ok(token);

    }
}