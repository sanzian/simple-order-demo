using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimpleOrder.Models;
using SimpleOrder.Services;

namespace SimpleOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ApiControllerBase<Invoice>
    {
        EmailService emailService;

        public OrdersController(InvoicesService service, EmailService emailService) : base(service)
        {
            this.emailService = emailService;
        }

        public override async Task<IActionResult> Post([FromBody] Invoice value)
        {
            var result = await base.Post(value);
            if (result is OkResult || result is OkObjectResult)
            {
                await this.emailService.SendEmailAsync(value);
            }
            return result;
        }
    }
}