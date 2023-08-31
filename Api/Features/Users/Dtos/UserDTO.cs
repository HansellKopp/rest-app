using Api.Features.Auth.Models;

namespace Api.Features.Users.Dtos;

public class UserDTO
{
    public Guid Id { get; set; } = new Guid();
    public string UserName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; } = string.Empty;
    public bool IsAdmin { get; set; } = false;

    public User ToUser()
    {
        return new User
        {
            UserName = UserName,
            FirstName = FirstName,
            LastName = LastName,
            Email = Email,
            PhoneNumber = PhoneNumber,
        };
    }

    public static explicit operator UserDTO(User user)
    {

        return new UserDTO
        {
            Id = new Guid(user.Id),
            UserName = user.UserName!,
            LastName = user.LastName,
            FirstName = user.FirstName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
        };
    }
}