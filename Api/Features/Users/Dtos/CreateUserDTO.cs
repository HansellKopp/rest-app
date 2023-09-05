using Api.Features.Auth.Models;

namespace Api.Features.Users.Dtos;

public class CreateUserDTO
{
    public Guid Id { get; set; } = new Guid();
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; } = string.Empty;
    public bool IsAdmin { get; set; } = false;
}