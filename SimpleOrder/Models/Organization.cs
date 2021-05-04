namespace SimpleOrder.Models
{
    public class Organization : EntityBase
    {
        public string Name { get; set; }

        public Address Address { get; set; }

        public Merchant Administrator { get; set; }
    }
}
