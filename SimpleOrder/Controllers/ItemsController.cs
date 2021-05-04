using Microsoft.AspNetCore.Mvc;
using SimpleOrder.Models;
using SimpleOrder.Services;

namespace SimpleOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ApiControllerBase<Item>
    {
        public ItemsController(ItemsService service) : base(service)
        {
        }
    }
}
