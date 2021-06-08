using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomersController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<Customer>> Get() =>
            _customerService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCustomer")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<Customer> Get(string id)
        {
            var customer = _customerService.Get(id);

            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy thông tin khách hàng" });
            }

            return customer;
        }

        [HttpPost]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<Customer> Create([FromForm] Customer customer)
        {
            var isExist = _customerService.IsExisted(customer.Name, customer.PhoneNumber);
            if (isExist)
                return BadRequest(new { message = "Thông tin khách hàng đã tồn tại" });
            _customerService.Create(customer);

            return CreatedAtRoute("GetCustomer", new { id = customer.Id.ToString() }, customer);
        }

        [HttpPut("{id:length(24)}")]
        [Authorize("admin, manager, receptionist")]
        public IActionResult Update(string id, [FromForm] Customer customerIn)
        {
            var isExist = _customerService.IsExisted(id);

            if (!isExist)
            {
                return NotFound(new { message = "Không tìm thấy thông tin khách hàng cần cập nhật" });
            }
            customerIn.Id = id;
            _customerService.Update(id, customerIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin")]
        public IActionResult Delete(string id)
        {
            var isExist = _customerService.IsExisted(id);

            if (!isExist)
            {
                return NotFound(new { message = "Không tìm thấy thông tin khách hàng cần xoá" });
            }

            _customerService.Remove(id);

            return NoContent();
        }
    }
}