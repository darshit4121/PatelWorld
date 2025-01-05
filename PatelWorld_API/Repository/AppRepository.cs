using PatelWorld_API.Models;
using PatelWorld_API.Repository.Interface;
using PatelWorld_API.Utilities;
using System.Data;

namespace PatelWorld_API.Repository
{
    public class AppRepository : IAppRepository
    {
        private readonly IConfiguration _configuration;

        public AppRepository(IConfiguration configuration)
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


        public CommonResponseModel SaveUser(InsertUpdateUserModel request)
        {
            CommonResponseModel response = new CommonResponseModel();
            try
            {
              
                DBHelper db = new DBHelper(_configuration);

                var sqlParameters = new object[] {
                "@UserId", request.UserId,                                              
                "@Name", request.Name,
                "@MobileNo", request.Mobile,
                "@Email", request.Email,
                "@Password", request.Password,
                "@CreatedBy", request.CreatedBy
                };

                DataTable res = db.ExecuteProcedure("InsertUpdateUser", sqlParameters);
                if (Convert.ToString(res.Rows[0]["Response"]) == "AlreadyExists")
                {
                    response.success = false;
                    response.message = res.Rows[0]["Response"].ToString();
                }
                else
                {
                    response.success = true;
                    response.message = res.Rows[0]["Response"].ToString();
                    response.data = new
                    {
                        UserId = res.Rows[0]["UserId"],
                       
                    };
                }

                return response;
            }
            catch (Exception ex)
            {
                response.success = false;
                response.message = "Something Went Wrong in SaveData!";
                response.data = "Error:" + ex.Message + " InnerException:" + ex.InnerException?.Message;
            }
            return response;
        }



        public CommonResponseModel DeleteUser(int Id)
        {
            CommonResponseModel response = new CommonResponseModel();
            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("Delete from TblUser Where UserId = '" + Id + "'");

                response.success = true;
                response.message = "Record Deleted Successfully";
            }
            catch (Exception ex)
            {
                response.success = false;
                response.message = "Something Went Wrong in Deleting Data!";
                response.data = "Error:" + ex.Message + " InnerException:" + ex.InnerException?.Message;
            }
            return response;
        }
    }
}
