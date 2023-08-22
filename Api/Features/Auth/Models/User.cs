using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Api.Features.Auth.Models;
public class User : IdentityUser { }

public class UserInfo
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}