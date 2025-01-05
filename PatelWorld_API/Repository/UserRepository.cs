using PatelWorld_API.Models;
using PatelWorld_API.Repository.Interface;
using PatelWorld_API.Utilities;
using System.Data;
using System.Net.Mail;
using System.Net;
using PatelWorld_API.Uitilities;

namespace PatelWorld_API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        private static Random random = new Random();
        private readonly static string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz-_@$!";
        private readonly static string charsOTP = "1234567890";
        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public CommonResponseModel Login(string Username, string Password)
        {
            CommonResponseModel response = new CommonResponseModel();
            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("Select Top 1 * from TblUser With(nolock) Where Email = '" + Username + "' AND Password='" + Password + "' COLLATE SQL_Latin1_General_CP1_CS_AS AND Isnull(IsDelete,0) = 0 AND IsActive = 1");

                TblUser user = CommonMethods.BindList<TblUser>(dt).FirstOrDefault();
                if (user != null)
                {
                    response.success = true;
                    response.message = "login successfully";
                    response.data = user;
                }
                else
                {
                    response.success = false;
                    response.message = "Invalid email or password";
                }
            }
            catch (Exception ex)
            {
                response.success = false;
                response.message = "Something Went Wrong in Login!";
                response.data = "Error:" + ex.Message + " InnerException:" + ex.InnerException?.Message;
            }


            return response;
        }

        public bool checkAdminEmailExists(string Email)
        {

            DBHelper db = new DBHelper(_configuration);
            DataTable dt = db.ExecuteQuery("SELECT TOP 1 * FROM TblUser WITH (NOLOCK) " +
    "WHERE (Email ='" + Email + "' OR Username = '" + Email + "') " +
    "AND ISNULL(IsDelete, 0) = 0 " +
    "AND IsActive = 1 " +
    "AND RoleId = '" + (int)(appEnums.CreatedUpdatedType.Admin) + "'");

            TblUser exists = CommonMethods.BindList<TblUser>(dt).FirstOrDefault();


            if (exists == null)
            {
                return false;
            }
            return true;
        }

    }
}
