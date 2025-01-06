﻿using PatelWorld_API.Models;

namespace PatelWorld_API.Repository.Interface
{
    public interface IFieldRepository
    {
       
        List<TblFields> GetAllFiledAdmin();
        List<TblFieldsOptions> GetAllFieldsOptions();
        CommonResponseModel DeleteField(CommonEditdelete obj);
        TblFields GetSingleField(CommonEditdelete obj);
        CommonResponseModel CreateUpdateByMapping(TblFields field);
        CommonResponseModel InsertUpdateFieldOptions(TblFieldsOptions model);
        CommonResponseModel DeleteFieldOptionsbyIdandFieldId(TblFieldsOptions idandfieldid);
        List<TblFieldsOptions> GetAllFieldOptions(int FieldId);

    }
}
