using System.Data;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Api.Features.Auth.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Api.Features.Auth.Services;

public static class AuthenticationServiceExtensions
{
    public static IServiceCollection AddTokenService(this IServiceCollection services)
    {
        // Wire up the token service
        return services.AddSingleton<ITokenService, TokenService>();
    }
}

public interface ITokenService
{
    // Generate a JWT token for the specified user name and admin role
    AuthToken GenerateToken(User user);
    RefreshToken GenerateRefreshToken();
    void SetRefreshToken(HttpResponse Response, RefreshToken newRefreshToken);
}

public sealed class TokenService : ITokenService
{
    private readonly int _durationMinutes;
    private readonly string _issuer;
    private readonly SigningCredentials _jwtSigningCredentials;
    private readonly Claim[] _audiences;

    public TokenService(IAuthenticationConfigurationProvider authenticationConfigurationProvider)
    {
        // We're reading the authentication configuration for the Bearer scheme
        var bearerSection = authenticationConfigurationProvider.GetSchemeConfiguration(JwtBearerDefaults.AuthenticationScheme);


        var section = bearerSection.GetSection("SigningKeys:0");

        _durationMinutes = int.Parse(bearerSection["DurationMinutes"] ?? "15");
        _issuer = bearerSection["ValidIssuer"] ?? throw new InvalidOperationException("Issuer is not specified");
        var signingKeyBase64 = section["Value"] ?? throw new InvalidOperationException("Signing key is not specified");

        var signingKeyBytes = Convert.FromBase64String(signingKeyBase64);

        _jwtSigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKeyBytes),
                SecurityAlgorithms.HmacSha256Signature);

        _audiences = bearerSection.GetSection("ValidAudiences").GetChildren()
                    .Where(s => !string.IsNullOrEmpty(s.Value))
                    .Select(s => new Claim(JwtRegisteredClaimNames.Aud, s.Value!))
                    .ToArray();
    }

    public AuthToken GenerateToken(User user)
    {
        var isAdmin = false;
        var identity = new ClaimsIdentity(JwtBearerDefaults.AuthenticationScheme);

        identity.AddClaim(new Claim(JwtRegisteredClaimNames.Sub, user.UserName!));

        var id = Guid.NewGuid().ToString().GetHashCode().ToString("x", CultureInfo.InvariantCulture);

        identity.AddClaim(new Claim(JwtRegisteredClaimNames.Jti, id));

        if (isAdmin)
        {
            identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
        }

        identity.AddClaims(_audiences);

        var handler = new JwtSecurityTokenHandler();

        var jwtToken = handler.CreateJwtSecurityToken(
            _issuer,
            audience: null,
            identity,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(_durationMinutes),
            issuedAt: DateTime.UtcNow,
            _jwtSigningCredentials);

        var token = new AuthToken
        {
            Token = handler.WriteToken(jwtToken)
        };

        return token;
    }

    public RefreshToken GenerateRefreshToken()
    {
        var refreshToken = new RefreshToken
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            Expires = DateTime.Now.AddDays(7),
            Created = DateTime.Now
        };

        return refreshToken;
    }

    public void SetRefreshToken(HttpResponse Response, RefreshToken newRefreshToken)    {
        
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = newRefreshToken.Expires
        };
        Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
    }

}
