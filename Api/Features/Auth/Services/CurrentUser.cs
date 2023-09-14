using System.Security.Claims;
using Api.Features.Auth.Models;

namespace Api.Features.Auth.Services;

// A scoped service that exposes the current user information
public class CurrentUser
{
    public User? User { get; set; }
    public ClaimsPrincipal Principal { get; set; } = default!;

    public string Id => Principal.FindFirstValue(ClaimTypes.NameIdentifier)!;
    public bool IsAdmin => Principal.IsInRole("admin");
}