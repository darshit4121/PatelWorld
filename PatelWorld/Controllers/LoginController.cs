using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PatelWorld_API.Models;
using PatelWorld_API.Repository;
using PatelWorld_API.Repository.Interface;
using PatelWorld_API.Uitilities;
using PatelWorld_API.Utilities;

namespace PatelWorld.Controllers
{
    public class LoginController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
            _userRepository = new UserRepository(_configuration);
        }

        public IActionResult Index()
        {
            var exists = HttpContext.Request.Cookies["AdminUsers"];
            if (exists != null)
            {
                var cookie = JsonConvert.DeserializeObject<CookieModel>(exists);

                HttpContext.Session.SetString(appEnums.Session.UserID.ToString(), ClsEncryptDecrypt.Decrypt(cookie.UserId.ToString()));
                HttpContext.Session.SetString(appEnums.Session.UserName.ToString(), cookie.Name.ToString());
                HttpContext.Session.SetString(appEnums.Session.RoleId.ToString(), ClsEncryptDecrypt.Decrypt(cookie.RoleId.ToString()));
                if (cookie.Image != null)
                {
                    HttpContext.Session.SetString(appEnums.Session.Avatar.ToString(), cookie.Image.ToString());
                }
                else
                {
                    HttpContext.Session.SetString(appEnums.Session.Avatar.ToString(), "");
                }
            }
            if (HttpContext.Session.GetString(appEnums.Session.UserID.ToString()) != null)
            {
                return Redirect(_configuration["OnlineLink:AdminLogin"].ToString());
            }
            return View();
        }

        [HttpPost]
        public IActionResult Login(string email, string password, bool isremember)
        {
            var response = _userRepository.Login(email, password);
            if (response != null && response.success == true)
            {
                var login = response.data as TblUser;
                if (isremember)
                {
                    var obj = new CookieModel { Name = login.UserName, Image = login.Image, UserId = ClsEncryptDecrypt.Encrypt(login.UserId.ToString()), Email = login.Email, RoleId = ClsEncryptDecrypt.Encrypt(login.RoleId.ToString()) };
                    HttpContext.Response.Cookies.Append("AdminUsers", JsonConvert.SerializeObject(obj));
                }
                HttpContext.Session.SetString(appEnums.Session.UserID.ToString(), login.UserId.ToString());
                HttpContext.Session.SetString(appEnums.Session.UserName.ToString(), login.UserName == null ? "User" : login.UserName.ToString());
                HttpContext.Session.SetString(appEnums.Session.RoleId.ToString(), login.RoleId.ToString());
                if (login.Image != null)
                {

                    HttpContext.Session.SetString(appEnums.Session.Avatar.ToString(), login.Image.ToString());
                }
                else
                {
                    HttpContext.Session.SetString(appEnums.Session.Avatar.ToString(), "");
                }
            }
            return Json(response);
        }


        [HttpPost]
        public bool CheckAdminEmailExists(string EmailId)
        {
            try
            {
                return _userRepository.checkAdminEmailExists(EmailId);
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        //[HttpPost]
        //public IActionResult ForgotPassword(string email)
        //{
        //    try
        //    {

        //        CommonResponseModel response = new CommonResponseModel();
        //        var data = _userRepository.GenerateForgotPasswordToken(email);

        //        if (data.success)
        //        {
        //            response.success = true;
        //            response.message = "Reset password link sent to your registered email.";
        //            response.data = "success";
        //        }
        //        else
        //        {
        //            response.success = false;
        //            response.message = "Something went wrong";
        //            response.data = "Failed";
        //        }
        //        return Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        CommonResponseModel responseModel = new CommonResponseModel();
        //        responseModel.success = false;
        //        responseModel.message = "Email not sent, try again later.";
        //        responseModel.data = ex.Message + " | Inner Ex - " + ex.InnerException?.Message;
        //        return Ok(responseModel);
        //    }
        //}

        public IActionResult Logout()
        {
            int UserId = Convert.ToInt32(HttpContext.Session.GetString(appEnums.Session.UserID.ToString()));
            HttpContext.Session.Remove(appEnums.Session.UserID.ToString());
            HttpContext.Session.Remove(appEnums.Session.UserName.ToString());
            HttpContext.Session.Remove(appEnums.Session.RoleId.ToString());
            HttpContext.Session.Remove(appEnums.Session.Avatar.ToString());
            Response.Cookies.Delete("AdminUsers");
            return Redirect(_configuration["OnlineLink:Admin"].ToString());
        }
    }
}
