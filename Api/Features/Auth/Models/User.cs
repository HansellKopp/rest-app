using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Api.Features.Auth.Models;
public class User : IdentityUser
{
    public required string FirstName { get; set; } = string.Empty;
    public required string LastName { get; set; } = string.Empty;
}

public class SigninInfo
{
    public required string UserName { get; set; }
    public required string Password { get; set; }
}

public class CreateUserDTO
{
    public required string UserName { get; set; }
    public required string FirstName { get; set; } = string.Empty;
    public required string LastName { get; set; } = string.Empty;
    public required string Password { get; set; }
}

public class CurrentUserDTO
{
    public required string UserName { get; set; } = string.Empty;
    public required string FirstName { get; set; } = string.Empty;
    public required string LastName { get; set; } = string.Empty;
    public required string Email { get; set; } = string.Empty;
    public required bool IsAdmin { get; set; } = false;
}