using Api.Features.Auth.Models;
using Api.Features.Users.Dtos;
using Microsoft.AspNetCore.Identity;

namespace Api.Features.Auth.Services;

public interface IUsersService
{
    Task<List<User>> GetAll();
    Task<User?> GetById(string id);
    Task<IdentityResult> Add(CreateUserDTO user);
    Task<bool> Update(string id, UserDTO user);
    Task<bool> Delete(string id);
    Task<UserDTO?> GetProfile(CurrentUser currentUser);
    Task<bool> UpdateProfile(CurrentUser currentUser, UserDTO userDTO);
    Task<User?> GetByRefreshToken(string token);
    Task<bool> SetRefreshToken(User current, RefreshToken newRefreshToken);
}
