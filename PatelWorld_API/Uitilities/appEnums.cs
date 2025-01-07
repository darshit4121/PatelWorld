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

        public enum DataType
        {
            text = 1,
            number = 2,
            email = 3,
            date = 4,
            textarea = 5,
            dropdown = 6,
            camera = 7,
            checkbox = 8,
            radiobutton = 9
        }

    }
}
