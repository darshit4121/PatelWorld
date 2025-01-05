namespace PatelWorld_API.Models
{
    public class UserModel
    {
    }


    public class TblUser
    {
        public int UserId { get; set; }
        public int? RoleId { get; set; }
        public string? UserName { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public string? Image {get; set; }
        public bool? IsSuperAdmin { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDelete { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }

    }


    public class InsertUpdateUserModel
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int CreatedBy { get; set; }
    }

    public class LoginModel
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }


    public class CookieModel
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string RoleId { get; set; }
    }
}
