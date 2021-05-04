using SimpleOrder.Models;

namespace SimpleOrder.Services
{
    public class CampaignsService : EntityServiceBase<Campaign>
    {
        public CampaignsService(DatabaseSettings settings) : base(settings)
        {
        }
    }

    public class ItemsService : EntityServiceBase<Item>
    {
        public ItemsService(DatabaseSettings settings) : base(settings)
        {
        }
    }

    public class InvoicesService: EntityServiceBase<Invoice>
    {
        public InvoicesService(DatabaseSettings settings) : base(settings)
        {
        }
    }
}
