namespace SimpleOrder.Models
{
    public class Address : EntityBase
    {
        public string StreetAddress1 { get; set; }

        public string StreetAddress2 { get; set; }

        public string City { get; set; }

        public string StateProvince { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }
    }
}
