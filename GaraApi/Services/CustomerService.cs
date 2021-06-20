using garaapi.Interfaces.Report;
using garaapi.Models.ReportModel;
using GaraApi.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class CustomerService : IReportService
    {
        private readonly IMongoCollection<Customer> _customer;

        public CustomerService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _customer = database.GetCollection<Customer>(settings.CustomerCollectionName);
        }

        public List<Customer> Get() =>
            _customer.Find(customer => true).ToList();

        public Customer Get(string id) =>
            _customer.Find<Customer>(customer => customer.Id == id).FirstOrDefault();

        public Customer Create(Customer customer)
        {
            customer.CreatedDate = System.DateTime.Now;
            try
            {
                _customer.InsertOne(customer);
                return customer;
            }
            catch
            {
                return null;
            }


        }

        public void Update(string id, Customer customerIn) =>
            _customer.ReplaceOne(customer => customer.Id == id, customerIn);

        public void Remove(Customer customerIn) =>
            _customer.DeleteOne(customer => customer.Id == customerIn.Id);

        public void Remove(string id) =>
            _customer.DeleteOne(customer => customer.Id == id);

        public bool IsExisted(string name, string phoneNumber)
        {
            var customer = _customer.Find(cus => cus.PhoneNumber == phoneNumber).CountDocuments();
            if (customer == 0)
                return false;
            return true;
        }

        public bool IsExisted(string id)
        {
            var customer = _customer.Find(cus => cus.Id == id).CountDocuments();
            if (customer == 0)
                return false;
            return true;
        }

        public IEnumerable<Object> Accept(IReportVisitor visitor)
        {
            return visitor.ExportCustomerReport(this._customer);
        }

        // public Dictionary<int, double> GetAnnualReport(int year)
        // {
        //     var filterBuilder = Builders<Customer>.Filter;
        //     var filter = filterBuilder.Gte("CreatedDate", new DateTime(year, 1, 1))
        //      & filterBuilder.Lt("CreatedDate", new DateTime(year + 1, 1, 1));
        //     var data = _customer.Find(filter)
        //     .Project(cus => new Tuple<int, double>(cus.CreatedDate.Month, 1))
        //     .ToList().GroupBy(pair => pair.Item1);
        //     var res = new Dictionary<int, double>();
        //     foreach (var group in data)
        //     {
        //         var total = group.Count();
        //         res.Add(group.Key, total);
        //     }
        //     return res;
        // }

        // public Dictionary<int, double> GetMonthlyFigure(int month, int year)
        // {
        //     var filter = Builders<Customer>.Filter.Gte("CreatedDate", new DateTime(year, month, 1));
        //     var data = _customer.Find(
        //         filter
        //     ).Project(
        //         cus => new Tuple<int, double>(cus.CreatedDate.Day, 1)
        //     ).ToList().GroupBy(pair => pair.Item1);
        //     var res = new Dictionary<int, double>();
        //     foreach (var group in data)
        //     {
        //         var total = group.Sum(pair => pair.Item2);
        //         res.Add(group.Key, total);
        //     }
        //     return res;
        // }
    }
}