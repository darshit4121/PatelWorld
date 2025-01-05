using PatelWorld_API.Models;

namespace PatelWorld_API.Repository.Interface
{
    public interface IAppRepository 
    {

        CommonResponseModel Login(string Username, string Password);
        CommonResponseModel SaveUser(InsertUpdateUserModel request);
        CommonResponseModel DeleteUser(int Id);
    }
}
