using Technico.DTOs;
using Technico.Interfaces;
using Technico.Models;
using Technico.Repositories;

namespace Technico.Services;

public class UserService(IRepository<User, Guid> repo, IUserRepo userRepo) : IUserService
{
    private readonly IRepository<User, Guid> _repo = repo;
    private readonly IUserRepo _userRepo = userRepo;

    public async Task<CreateUserDto?> CreateUserAsync(CreateUserDto? createUserDto)
    {
        User? user = await _repo.CreateAsync(new User
        {
            Id = new Guid(),
            Name = createUserDto.Name,
            Surname = createUserDto.Surname,
            VATNumber = createUserDto.VATNumber,
            Address = createUserDto.Address,
            PhoneNumber = createUserDto.PhoneNumber,
            Email = createUserDto.Email,
            Password = createUserDto.Password,
            IsPropertyOwner = true,
        });

        if (user == null) 
        {
            return null;
        }

        return createUserDto;
    }

    public async Task<UserResponseDto?> DeleteByIdAsync(Guid id)
    {
        User? user = await _repo.DeleteAsync(id);
        if (user == null)
        {
            return null;
        }

        return new UserResponseDto { Name = user.Name, Surname = user.Surname };
    }

    public async Task<User?> FindByIdAsync(Guid id)
    {
        User? user = await _repo.GetAsync(id);

        return user;
    }

    public async Task<List<CreateUserDto>?> GetAllUsersAsync()
    {
        List<User>? users = await _repo.GetAllAsync(1, 20);
        if (users == null)
        {
            return null;
        }

        List<CreateUserDto>? result = users.Select(user => new CreateUserDto {
            Id = user.Id,
            Name = user.Name, 
            Surname = user.Surname, 
            Address = user.Address,
            PhoneNumber = user.PhoneNumber, 
            Email = user.Email,
            Password = user.Password,
            IsPropertyOwner = true,
        }).ToList();

        return result;
    }

    public async Task<List<CreateUserDto>?> GetUsersPaginatedAsync(int pageCount, int pageSize)
    {
        List<User>? users = await _repo.GetAllAsync(pageCount, pageSize);

        if (users == null || users.Count == 0)
        {
            return null;
        }

        List<CreateUserDto> result = users.Select(user => new CreateUserDto
        {
            Id = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            Address = user.Address,
            PhoneNumber = user.PhoneNumber,
            Email = user.Email,
            Password = user.Password,
            IsPropertyOwner = true,
        }).ToList();

        return result;
    }

    public async Task<CreateUserDto?> UpdateUserAsync(Guid id, CreateUserDto updatedUser)
    {
        var existingUser = await _repo.GetAsync(id);
        if (existingUser == null)
        {
            return null;
        }

        existingUser.Name = updatedUser.Name;
        existingUser.Surname = updatedUser.Surname;
        existingUser.VATNumber = updatedUser.VATNumber;
        existingUser.Address = updatedUser.Address;
        existingUser.PhoneNumber = updatedUser.PhoneNumber;
        existingUser.Email = updatedUser.Email;
        existingUser.Password = updatedUser.Password;

        User? user = new();

        user = await _repo.UpdateAsync(id, existingUser);

        if (user == null)
        {
            return null;
        }
        return updatedUser;
    }

    public async Task<LoginResponseDto?> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepo.AuthenticateUser(email,password);

        if (user == null)
        {
            return null; // Invalid credentials
        }

        var token = GenerateToken(user);

        return new LoginResponseDto
        {
            Id = user.Id,
            Email = user.Email,
            IsAdmin = !user.IsPropertyOwner
        };
    }

    private string GenerateToken(User user)
    {
        return "mock-user-token";
    }

    public async Task<int> GetTotalUsersCountAsync()
    {
        return await _userRepo.CountAsync();
    }
}
