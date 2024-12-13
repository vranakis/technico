using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Technico.Models;

namespace Technico.Interfaces
{
    public interface IUserRepo
    {
        Task<User?> AuthenticateUser(string email, string password);
        Task<int> CountAsync();
    }
}
