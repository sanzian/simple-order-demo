namespace SimpleOrder.Models
{
    public class Group : EntityBase
    {
        public string OrganizationId { get; set; }

        public string Name { get; set; }

        public string[] Merchants { get; set; }
    }
}
