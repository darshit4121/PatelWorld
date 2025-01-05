using Microsoft.AspNetCore.Mvc;
using PatelWorld_API.Uitilities;

namespace PatelWorld.Controllers
{
    public class BaseController : Controller
    {
        public bool MainCheck()
        {
            if (HttpContext.Session.GetString(appEnums.Session.UserID.ToString()) == null)
            {
                return false;
            }
            return true;
        }
    }
}
