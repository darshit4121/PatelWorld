using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PatelWorld_API.Models;
using PatelWorld_API.Repository;
using PatelWorld_API.Repository.Interface;

namespace PatelWorld_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppAPIController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAppRepository _appRepository;

        public AppAPIController(IConfiguration configuration)
        {
            _configuration = configuration;
            _appRepository = new AppRepository(_configuration);
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel login)
        {
            CommonApiResponseModel res = new CommonApiResponseModel();
            try
            {
                var model = _appRepository.Login(login.Email , login.Password);

                if (model != null && model.data != null)
                {
                 
                    res.statusCode = 200;
                    res.success = true;
                    res.message = "success";
                    res.data = model;

                    return Ok(res);
                }
                else
                {
                    res.statusCode = 400;
                    res.success = false;
                    res.message = "Incorrect MPIN";

                    return Ok(res);
                }
            }
            catch (Exception ex)
            {
                res.statusCode = 400;
                res.success = false;
                res.message = "Fail to Login, Please contact administrator.";
                res.data = "Error - " + ex.Message + " Inner Error - " + ex.InnerException?.Message;

                return Ok(res);
            }
        }


    }
}
