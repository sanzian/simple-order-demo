using Microsoft.AspNetCore.Mvc;
using SimpleOrder.Models;
using SimpleOrder.Services;

namespace SimpleOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignsController : ApiControllerBase<Campaign>
    {
        public CampaignsController(CampaignsService service) : base(service)
        {
        }
    }
}
