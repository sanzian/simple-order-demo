namespace SimpleOrder.Models
{
    public class Campaign : EntityBase
    {
        public string CampaignId { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public string OrganizationId { get; set; }
    }
}
