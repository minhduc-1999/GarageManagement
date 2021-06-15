using garaapi.Models.ReportModel;
using garaapi.Services.ReportService;
using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
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
            var res = _customerService.Create(customer);
            if (res == null)
            {
                return BadRequest();
            }
            return CreatedAtRoute("GetCustomer", new { id = res.Id.ToString() }, res);
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
        [HttpGet("/api/report/new-customer")]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<List<ReportElement>> GetReport([FromQuery] string option, [FromQuery] int year, [FromQuery] int month)
        {
            IEnumerable<ReportElement> res = null;
            if (option == "annual")
            {
                res = _customerService.Accept(new AnnualReportVisitor(new DateTime(year, 1, 1), new DateTime(year + 1, 1, 1)));
            }

            if (option == "monthly")
            {
                int endMonth = month + 1;
                int endYear = year;
                if (month == 12)
                {
                    endMonth = 1;
                    endYear++;
                }
                res = _customerService.Accept(new MonthlyReportVisitor(new DateTime(year, month, 1), new DateTime(endYear, endMonth, 1)));
            }

            if (res == null)
                return BadRequest();
            return new List<ReportElement>(res);
        }
    }
}