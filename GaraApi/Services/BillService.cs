using System;
using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using MongoDB.Driver;

namespace GaraApi.Services
{
    public class BillService
    {
        private readonly IMongoCollection<Bill> _bill;
        private readonly RepairedRequestService _rrService;
        private readonly CustomerService _customerService;


        public BillService(IGaraDatabaseSettings settings, RepairedRequestService rrService, CustomerService customerService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _bill = database.GetCollection<Bill>(settings.BillCollectionName);

            _rrService = rrService;
            _customerService = customerService;
        }

        public List<Bill> Get() =>
            _bill.Find(bill => true).ToList();

        public Bill Get(string id) =>
            _bill.Find<Bill>(bill => bill.Id == id).FirstOrDefault();

        public Tuple<int, string, Bill> Create(UserClaim creator, BillCreatedModel model)
        {
            if (isExisted(model.RepairedRequestId))
                return new Tuple<int, string, Bill>(400, "Bill is already existed", null);

            double total = 0;

            var details = _rrService.GetQuotationDetails(model.RepairedRequestId);

            if (details != null)
            {

                foreach (var detail in details)
                {
                    total += detail.Quantity * detail.UnitPrice + detail.LaborCost;
                }
                if (model.Discount != 0)
                {
                    total = total * (1 - model.Discount);
                }
            }

            var customer = _customerService.Get(model.CustomerId);

            if (customer == null)
            {
                return new Tuple<int, string, Bill>(400, "Customer Not Found", null);
            }

            Bill bill = new Bill()
            {
                TotalAmount = total,
                CreatedDate = System.DateTime.Now,
                Creator = creator,
                Id = model.RepairedRequestId,
                Details = null,
                Customer = customer,
                Discount = model.Discount,
                VAT = model.VAT
            };
            try
            {
                _bill.InsertOne(bill);
                return new Tuple<int, string, Bill>(200, "", bill);
            }
            catch
            {
                return new Tuple<int, string, Bill>(500, "", null);
            }


        }

        // public void Update(string id, Bill billIn) =>
        //     _bill.ReplaceOne(bill => bill.Id == id, billIn);

        // public void Remove(Bill billIn) =>
        //     _bill.DeleteOne(bill => bill.Id == billIn.Id);

        // public void Remove(string id) =>
        //     _bill.DeleteOne(bill => bill.Id == id);

        public bool isExisted(string id)
        {
            var num = _bill.CountDocuments(bill => bill.Id == id);
            if (num == 0)
                return false;
            return true;
        }
    }
}