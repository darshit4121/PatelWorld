namespace PatelWorld_API.Uitilities
{
    public class appEnums
    {

        public enum Session
        {
            UserName,
            UserID,
            Avatar,
            RoleId
        }

        public enum CreatedUpdatedType
        {
            Admin = 1,
            Owner = 2,
            Client = 3,
            Department = 8,
            Member = 9,
            Exhibitor = 10
        }

    }
}
