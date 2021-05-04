using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimpleOrder.Services;

namespace SimpleOrder.Controllers
{
    public class ApiControllerBase<T> : ControllerBase
        where T : SimpleOrder.Models.EntityBase
    {
        protected EntityServiceBase<T> service;

        public ApiControllerBase(EntityServiceBase<T> service)
        {
            this.service = service;
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] T value)
        {
            IActionResult r = null;
            try
            {
                var q = await this.service.Add(value);
                r = this.Ok(q);
            }
            catch (Exception ex)
            {
                r = this.HandleException(ex);
            }
            return r;
        }

        [HttpGet]
        public virtual async Task<IActionResult> Get()
        {
            IActionResult r = null;
            try
            {
                var q = await this.service.GetAll();
                r = this.Ok(q);
            }
            catch (Exception ex)
            {
                r = this.HandleException(ex);
            }
            return r;
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> GetById(string id)
        {
            IActionResult r = null;
            try
            {
                var q = await this.service.Get(id);
                r = this.Ok(q);
            }
            catch (Exception ex)
            {
                r = this.HandleException(ex);
            }
            return r;
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> UpdateById([FromRoute] string id, [FromBody] T value)
        {
            IActionResult r = null;
            try
            {
                await this.service.Update(id, value);
                r = this.Ok(true);
            }
            catch (Exception ex)
            {
                r = this.HandleException(ex);
            }
            return r;
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> DeleteById(string id)
        {
            IActionResult r = null;
            try
            {
                await this.service.Remove(id);
                r = this.Ok(true);
            }
            catch (Exception ex)
            {
                r = this.HandleException(ex);
            }
            return r;
        }

        public IActionResult HandleException(Exception ex)
        {
#if DEBUG
            return this.BadRequest(ex);
#else
            return this.BadRequest();
#endif
        }
    }
}