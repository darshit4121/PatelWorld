using PatelWorld_API.Models;
using PatelWorld_API.Repository.Interface;
using PatelWorld_API.Uitilities;
using PatelWorld_API.Utilities;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Reflection;

namespace PatelWorld_API.Repository
{
    public class FieldRepository : IFieldRepository
    {
        private readonly IConfiguration _configuration;
        public FieldRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
  
    
        public List<TblFields> GetAllFiledAdmin()
        {
           List<TblFields> model = new List<TblFields>();
            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("SELECT * FROM TblFields WITH (NOLOCK) WHERE IsDelete = 0 AND IsActive = 1 ORDER BY Id DESC");

                model = CommonMethods.BindList<TblFields>(dt);
            }
            catch (Exception ex)
            {
            }
            return model;
        }

        public List<TblFieldsOptions> GetAllFieldsOptions()
        {
            List<TblFieldsOptions> model = new List<TblFieldsOptions>();
            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("SELECT * FROM TblFieldsOptions WITH (NOLOCK) WHERE IsDelete = 0 AND IsActive = 1 ORDER BY Id DESC");

                model = CommonMethods.BindList<TblFieldsOptions>(dt);
            }
            catch (Exception ex)
            {
            }
            return model;
           
        }

        public List<TblFieldsOptions> GetAllFieldOptions(int FieldId)
        {
            List<TblFieldsOptions> model = new List<TblFieldsOptions>();
            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("SELECT * FROM TblFieldsOptions WITH (NOLOCK) WHERE FieldId = FieldId ");

                model = CommonMethods.BindList<TblFieldsOptions>(dt);
            }
            catch (Exception ex)
            {
            }
            return model;
        }
        public TblFields GetSingleField(CommonEditdelete obj)
        {
            TblFields model = new TblFields();
            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("SELECT TOP 1 * FROM TblFields WITH (NOLOCK) WHERE Id = @Id  AND IsActive = 1 AND IsDelete != 1 ");

                model = CommonMethods.BindList<TblFields>(dt).FirstOrDefault();
            }
            catch (Exception ex)
            {

            }
            return model;
        }
        public CommonResponseModel DeleteField(CommonEditdelete obj)
        {
            CommonResponseModel res = new CommonResponseModel();

            try
            {
                DBHelper db = new DBHelper(_configuration);
                DataTable dt = db.ExecuteQuery("UPDATE TblFields  WITH (ROWLOCK) SET IsActive = 0, IsDelete = 1 WHERE Id = @Id  AND IsActive = 1 AND IsDelete != 1");

                res.success = true;
                res.message = "Field successfully deleted.";
            }
            catch (Exception ex)
            { 
            }
            return (res);
        }

        public CommonResponseModel DeleteFieldOptionsbyIdandFieldId(TblFieldsOptions idandfieldid)
        {
            CommonResponseModel res = new CommonResponseModel();
            try
            {

                DBHelper db = new DBHelper(_configuration);
                var sqlParameters = new object[] {
                "@Id", idandfieldid.Id,
                "@FieldId", idandfieldid.FieldId
                };
                DataTable dt = db.ExecuteProcedure("DeleteFieldOptionsByIdandFieldId", sqlParameters);

                var success = dt;
            }
            catch (Exception ex)
            {
                
            }
            return res;
        }

        //public CommonResponseModel CreateUpdateByMapping(TblFields field)
        //{
        //    CommonResponseModel model = new CommonResponseModel();
           

        //    var addedFieldId = 0;
        //    if (field.Id > 0)
        //    {
        //        var exists = _context.TblFields.Where(z => z.Id != field.Id && z.BusinessId == field.BusinessId && z.Name.ToLower() == field.Name.ToLower() && z.IsActive == true && z.IsDelete != true).FirstOrDefault();
        //        var fieldData = _context.TblFields.Where(z => z.Id == field.Id && z.IsDelete != true && z.IsActive == true).FirstOrDefault();
        //        if (exists != null)
        //        {
        //            model.IsSuccess = false;
        //            model.Message = "Field " + field.Name + " already exists";
        //            return (model);
        //        }
        //        else
        //        {
        //            fieldData.ModifiedBy = field.ModifiedBy;
        //            fieldData.ModifiedDate = field.ModifiedDate;
        //            fieldData.IsAdminDefault = field.IsAdminDefault;
        //            fieldData.BusinessId = field.BusinessId;
        //            fieldData.Name = field.Name;
        //            fieldData.Datatype = field.Datatype;
        //            fieldData.Description = field.Description;
        //            fieldData.IsActive = field.IsActive;
        //            fieldData.IsDelete = field.IsDelete;
        //            _context.TblFields.Update(fieldData);

        //            _context.SaveChanges();
        //        }

        //    }
        //    else
        //    {
        //        TblFields data = new TblFields();
        //        var exists = _context.TblFields.Where(z => z.Name.ToLower() == field.Name.ToLower() && z.BusinessId == field.BusinessId && z.IsActive == true && z.IsDelete != true).FirstOrDefault();
        //        if (exists != null)
        //        {
        //            model.IsSuccess = false;
        //            model.Message = "Field " + field.Name + " already exists";
        //            return (model);
        //        }
        //        if (exists == null)
        //        {
        //            data.IsAdminDefault = field.IsAdminDefault;
        //            data.BusinessId = field.BusinessId;
        //            data.Name = field.Name;
        //            data.Datatype = field.Datatype;
        //            data.Description = field.Description;
        //            data.CreatedDate = field.CreatedDate;
        //            data.IsActive = field.IsActive;
        //            data.IsDelete = field.IsDelete;

                   

        //            _context.TblFields.Add(data);
        //            _context.SaveChanges();
        //        }
        //        addedFieldId = data.Id;
        //    }
        //    model.IsSuccess = true;
        //    model.Message = "success";
        //    model.data = addedFieldId;
        //    return (model);
        //}
        public CommonResponseModel InsertUpdateFieldOptions(TblFieldsOptions model)
        {
            CommonResponseModel res = new CommonResponseModel();
            try
            {

                DBHelper db = new DBHelper(_configuration);
                var sqlParameters = new object[] {
                "@Id", model.Id,
                "@FieldId", model.FieldId,
                "@Value", model.Value,
                "@DisplayOrder", model.DisplayOrder,
                };
                DataTable dt = db.ExecuteProcedure("InsertUpdateFieldOptions", sqlParameters);

                var success = dt;
                
            }
            catch (Exception ex)
            {
              
            }
            return res;
        }

     
    }
}
