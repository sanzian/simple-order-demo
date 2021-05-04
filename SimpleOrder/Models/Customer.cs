namespace SimpleOrder.Models
{
    public class Customer : UserBase
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public string EmailAddress { get; set; }

        public Address Address { get; set; }
    }
}
