using System.Collections.Generic;
using GaraApi.Entities;

using MongoDB.Driver;

namespace GaraApi.Services
{
    public class CarService
    {
        private readonly IMongoCollection<Car> _car;

        public CarService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _car = database.GetCollection<Car>(settings.CarCollectionName);
        }

        public List<Car> Get() =>
            _car.Find(Car => true).ToList();

        public Car Get(string id) =>
            _car.Find<Car>(Car => Car.Id == id).FirstOrDefault();

        public Car Create(Car Car)
        {
            _car.InsertOne(Car);
            return Car;
        }

        public void Update(string id, Car CarIn) =>
            _car.ReplaceOne(Car => Car.Id == id, CarIn);

        public void Remove(Car CarIn) =>
            _car.DeleteOne(Car => Car.Id == CarIn.Id);

        public void Remove(string id) =>
            _car.DeleteOne(Car => Car.Id == id);
    }
}