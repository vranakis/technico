using Technico.DTOs;
using Technico.Models;

namespace Technico.Interfaces;

public interface IUserService
{
    Task<List<CreateUserDto>?> GetAllUsersAsync();
    Task<User?> FindByIdAsync(Guid id);
    Task<CreateUserDto?> CreateUserAsync(CreateUserDto createUserDto);
    Task<CreateUserDto?> UpdateUserAsync(Guid id, CreateUserDto userResponseDto);
    Task<UserResponseDto?> DeleteByIdAsync(Guid id);
    Task<LoginResponseDto?> AuthenticateAsync(string email, string password);
}
