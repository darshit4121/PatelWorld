using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using PatelWorld_API.Models;
using PatelWorld_API.Repository;
using PatelWorld_API.Repository.Interface;
using PatelWorld_API.Uitilities;

namespace PatelWorld.Controllers
{
    public class FieldController : BaseController
    {



        private readonly IConfiguration _configuration;
        private readonly  IFieldRepository _fieldRepository;
        

        public FieldController(IConfiguration configuration)
        {
            _configuration = configuration;
            _fieldRepository = new FieldRepository(_configuration);
           
        }


        
        public IActionResult Index()
        {
            //bool myAction = MainCheck();
            //if (!myAction)
            //    return Redirect(_configuration["OnlineLink:ClientAdminLogin"].ToString());
            var ListingRecord = _fieldRepository.GetAllFiledAdmin();
            ViewBag.List = ListingRecord;

            return View(new Fieldfilter() { });
        }

        [Route("admin/master/field/addfield")]
        public IActionResult AddField(CommonEditdelete obj)
        {
            bool myAction = MainCheck();
            if (!myAction)
                return Redirect(_configuration["OnlineLink:ClientAdminLogin"].ToString());

            var AllFieldsOptions = _fieldRepository.GetAllFieldsOptions();
          
            ViewBag.AllOpionsValue = AllFieldsOptions;
            ViewBag.Fieldoptions = _fieldRepository.GetAllFieldOptions(obj.Id);
            if (obj != null && obj.Id > 0)
            {
                var data = _fieldRepository.GetSingleField(obj);
                return View(data);
            }

            return View(new TblFields());
        }

        [Route("admin/master/field/viewfield")]
        public IActionResult viewField(CommonEditdelete obj)
        {
            if (obj != null && obj.Id > 0)
            {
                var data = _fieldRepository.GetSingleField(obj);
                return View(data);
            }
            return View(new TblFields());
        }
        public void getField()
        {
            List<TblFields> response = _fieldRepository.GetAllFiledAdmin();
            List<SelectListItem> items = new List<SelectListItem>();
            foreach (var res in response)
            {
                items.Add(new SelectListItem
                {
                    Text = res.Datatype.ToString(),
                    Value = res.Id.ToString()
                });
            }
            ViewBag.datatypeList = items;
        }


        [HttpPost]
        public string SaveField(TblFields addfield, List<TblFieldsOptions> Fieldoptions)
        {
        
            addfield.IsActive = true;
            addfield.IsDelete = false;
            addfield.CreatedDate = DateTime.Now;
            if (addfield.Id > 0)
            {
                addfield.ModifiedDate = DateTime.Now;
            }
            var result = _fieldRepository.CreateUpdateByMapping(addfield);

            if (result.success && Fieldoptions != null)
            {
                foreach (var option in Fieldoptions)
                {
                    if (result.data > 0)
                    {
                        option.FieldId = result.data;
                    
                    }
                    else
                    {
                        option.FieldId = addfield.Id;
                 
                    }
                    var optionResult = _fieldRepository.InsertUpdateFieldOptions(option);
                }
            }
            var data = Url.Action("Index", "Field");
            if (result.success == true)
            {
                result.message = data;
            }
            var json = JsonConvert.SerializeObject(result);
            return json;
        }


        [HttpPost]
        public string DeleteField(CommonEditdelete obj)
        {
            var result = _fieldRepository.DeleteField(obj);
            if (result.success == true)
            {
                return "success";
            }
            else
            {
                return result.message;
            }
        }

        [HttpPost]
        public string DeleteFieldOptions(List<TblFieldsOptions> DeleteFieldOptions)
        {
            foreach (var option in DeleteFieldOptions)
            {
                var result = _fieldRepository.DeleteFieldOptionsbyIdandFieldId(option);
            }
            var json = JsonConvert.SerializeObject("");
            return json;
        }




    }
}
