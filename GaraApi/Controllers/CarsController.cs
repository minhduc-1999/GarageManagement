using GaraApi.Entities;
using GaraApi.Services;
using GaraApi.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GaraApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarService _carService;

        public CarsController(CarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        [Authorize("admin, manager, storekeeper, employee, receptionist")]
        public ActionResult<List<Car>> Get() =>
            _carService.Get();

        [HttpGet("{id:length(24)}", Name = "GetCar")]
        [Authorize("admin, manager, storekeeper, employee, receptionist")]
        public ActionResult<Car> Get(string id)
        {
            var car = _carService.Get(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        [HttpPost]
        [Authorize("admin, manager, receptionist")]
        public ActionResult<Car> Create([FromForm] Car car)
        {
            var curCar = _carService.GetCarByNumberPlate(car.NumberPlate);
            if (curCar != null)
                return BadRequest(new { message = "Car has been used" });
            _carService.Create(car);
            return CreatedAtRoute("GetCar", new { id = car.Id.ToString() }, car);
        }

        [HttpPut]
        [Authorize("admin, manager, receptionist")]
        public IActionResult Update([FromBody] Car carIn)
        {
            var car = _carService.Get(carIn.Id);

            if (car == null)
            {
                return NotFound();
            }

            _carService.Update(carIn.Id, carIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        [Authorize("admin, manager, receptionist")]
        public IActionResult Delete(string id)
        {
            var car = _carService.Get(id);

            if (car == null)
            {
                return NotFound();
            }

            _carService.Remove(car.Id);

            return NoContent();
        }
    }
}