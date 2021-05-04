namespace SimpleOrder.Models
{
    public class Item : EntityBase
    {
        public string ItemNumber { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public ItemOption[] Options { get; set; }

        public bool Taxable { get; set; }

        public string Image { get; set; }

        public bool Active { get; set; }

        public string CampaignId { get; set; }
    }
}
