using PatelWorld_API.Models;

namespace PatelWorld_API.Repository.Interface
{
    public interface IUserRepository
    {
        CommonResponseModel Login(string Username, string Password);

        public bool checkAdminEmailExists(string Email);
    }
}
