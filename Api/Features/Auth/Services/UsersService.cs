using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Api.Db;
using Api.Features.Users.Dtos;
using Api.Features.Auth.Models;


namespace Api.Features.Auth.Services;

public class UsersService : IUsersService
{
    private readonly Dbc _dbContext;
    private readonly UserManager<User> _userManager;

    public UsersService(UserManager<User> userManager, Dbc context)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    async public Task<IdentityResult> Add(CreateUserDTO newUser)
    {
        var user = new User
        {
            UserName = newUser.UserName,
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            PhoneNumber = newUser.PhoneNumber,
        };
        return await _userManager.CreateAsync(user, newUser.Password);
    }

    async public Task<bool> Delete(string id)
    {
          if (await _dbContext.Users.FindAsync(id.ToString()) is User user)
          {
              _dbContext.Users.Remove(user);
              await _dbContext.SaveChangesAsync();
              return true;
          }
          return false;
    }

    async public Task<List<User>> GetAll()
    {
        return await _userManager.Users.ToListAsync();
    }

    async public Task<User?> GetById(string id)
    {
        var item = await _dbContext.Users.FindAsync(id);
        return item;
    }

    async public Task<bool> Update(string id, UserDTO userDTO)
    {

        var user = await _dbContext.Users.FindAsync(id);

        if (user is null) return false;

        user.LastName = userDTO.LastName;
        user.Email = userDTO.Email;
        user.FirstName = userDTO.FirstName;
        user.PhoneNumber = userDTO.PhoneNumber;

        await _dbContext.SaveChangesAsync();
        return true;
    }

    async public Task<bool> UpdateProfile(CurrentUser currentUser, UserDTO userDTO)
    {
        var current = await _userManager.FindByNameAsync(currentUser.Id);
        if (current is null) return false;
        return await Update(current.Id, userDTO);
    }

    async public Task<UserDTO?> GetProfile(CurrentUser currentUser)
    {
        var current = await _userManager.FindByNameAsync(currentUser.Id);
        if(current is not null)
        {
            var user = await _dbContext.Users.FindAsync(current.Id);
            if (user is not null)
            {
                return (UserDTO)user;
            }
        }
        return null;
    }

    async public Task<User?> GetByRefreshToken(string token)
    {
        var item = await _dbContext.Users.FirstOrDefaultAsync(x=> x.RefreshToken.Equals(token));
        return item;
    }

    async public Task<bool> SetRefreshToken(User current, RefreshToken newRefreshToken)
    {
        var user = await _dbContext.Users.FindAsync(current.Id);
        if (user is null) return false;
        user.RefreshToken = newRefreshToken.Token;
        user.TokenCreated = newRefreshToken.Created;
        user.TokenExpires = newRefreshToken.Expires;
        await _dbContext.SaveChangesAsync();
        return true;
    }
}

