using Microsoft.AspNetCore.Mvc;
using PatelWorld.Models;
using System.Diagnostics;

namespace PatelWorld.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            bool myAction = MainCheck();
            if (!myAction)
                return Redirect(_configuration["OnlineLink:Admin"].ToString());
            return View();
        }

       
    }
}
