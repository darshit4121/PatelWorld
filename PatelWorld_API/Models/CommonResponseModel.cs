using System.ComponentModel.DataAnnotations;

namespace PatelWorld_API.Models
{
    public class CommonResponseModel
    {
        public bool success { get; set; }
        public string message { get; set; }
        public dynamic data { get; set; }
    }


    public class ResponseCommon
    {
        [StringLength(5)]
        public int statusCode { get; set; }
        public object data { get; set; }
        public object message { get; set; }
    }


    public class CommonApiResponseModel
    {
        public bool success { get; set; }
        public string message { get; set; }
        public int statusCode { get; set; }
        public dynamic data { get; set; }
    }

    public class CommonEditdelete
    {
        public int Id { get; set; }
    }

    public class InsertUpdateBlogRes
    {
        public string Message { get; set; }
    }
}
