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

        public CommonResponseModel CreateUpdateByMapping(TblFields field)
        {
            CommonResponseModel model = new CommonResponseModel();
            DBHelper db = new DBHelper(_configuration);
            var addedFieldId = 0;

            try
            {
                if (field.Id > 0)
                {
                    var existsQuery = "SELECT COUNT(1) FROM TblFields WHERE Id != @Id AND LOWER(Name) = @Name AND IsActive = 1 AND IsDelete != 1";
                    var existsParams = new object[] { "@Id", field.Id, "@Name", field.Name.ToLower() };
                    var exists = (int)db.ExecuteScalar(existsQuery, existsParams).Result;

                    if (exists > 0)
                    {
                        model.success = false;
                        model.message = "Field " + field.Name + " already exists";
                        return model;
                    }

                    var updateQuery = "UPDATE TblFields SET ModifiedBy = @ModifiedBy, ModifiedDate = @ModifiedDate, Name = @Name, Datatype = @Datatype, Description = @Description, IsActive = @IsActive, IsDelete = @IsDelete WHERE Id = @Id";
                    var updateParams = new object[]
                    {
                "@ModifiedBy", field.ModifiedBy,
                "@ModifiedDate", field.ModifiedDate,
                "@Name", field.Name,
                "@Datatype", field.Datatype,
                "@Description", field.Description,
                "@IsActive", field.IsActive,
                "@IsDelete", field.IsDelete,
                "@Id", field.Id
                    };
                    db.ExecuteNonQuery(updateQuery, updateParams).Wait();
                }
                else
                {
                    var existsQuery = "SELECT COUNT(1) FROM TblFields WHERE LOWER(Name) = @Name AND IsActive = 1 AND IsDelete != 1";
                    var existsParams = new object[] { "@Name", field.Name.ToLower() };
                    var exists = (int)db.ExecuteScalar(existsQuery, existsParams).Result;

                    if (exists > 0)
                    {
                        model.success = false;
                        model.message = "Field " + field.Name + " already exists";
                        return model;
                    }

                    var insertQuery = "INSERT INTO TblFields (Name, Datatype, Description, CreatedDate, IsActive, IsDelete) OUTPUT INSERTED.Id VALUES (@Name, @Datatype, @Description, @CreatedDate, @IsActive, @IsDelete)";
                    var insertParams = new object[]
                    {
                "@Name", field.Name,
                "@Datatype", field.Datatype,
                "@Description", field.Description,
                "@CreatedDate", field.CreatedDate,
                "@IsActive", field.IsActive,
                "@IsDelete", field.IsDelete
                    };
                    addedFieldId = (int)db.ExecuteScalar(insertQuery, insertParams).Result;
                }

                model.success = true;
                model.message = "success";
                model.data = addedFieldId;
            }
            catch (Exception ex)
            {
                model.success = false;
                model.message = ex.Message;
            }

            return model;
        }

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
