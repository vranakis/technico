using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Technico.Context;
using Technico.DTOs;
using Technico.Interfaces;
using Technico.Models;

namespace TechnicoAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
        _service = service;
    }

    // GET: api/Users
    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<CreateUserDto>?>> GetUsers()
    {
        return await _service.GetAllUsersAsync();
    }


    // GET: api/Users/5
    [HttpGet]
    [Route("{id:guid}")]
    public async Task<ActionResult<User?>> GetUser(Guid id)
    {
        return await _service.FindByIdAsync(id);
    }

    // PUT: api/Users/5
    [HttpPut("{id}")]
    public async Task<ActionResult<CreateUserDto?>> PutUser(Guid id, CreateUserDto user)
    {
        return await _service.UpdateUserAsync(id, user);
    }

    // POST: api/Users
    [HttpPost]
    public async Task<ActionResult<CreateUserDto?>> PostUser(CreateUserDto user)
    {        
        return await _service.CreateUserAsync(user);
    }

    // DELETE: api/Users/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<UserResponseDto?>> DeleteUser(Guid id)
    {
        return await _service.DeleteByIdAsync(id);
    }

    private async Task<ActionResult<User?>> UserExists(Guid id) 
    {
        return await _service.FindByIdAsync(id);
    }

    // POST: api/Users/login
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginRequest)
    {
        // Validate credentials
        var result = await _service.AuthenticateAsync(loginRequest.Email, loginRequest.Password);

        if (result == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Return the authenticated user or a token
        return Ok(result);
    }
}
