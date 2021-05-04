namespace SimpleOrder.Models
{
    public class User : UserBase
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Salt { get; set; }

        public string Email { get; set; }
    }
}
