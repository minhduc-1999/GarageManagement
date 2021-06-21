using garaapi.Interfaces.Report;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services.Identity;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class AccessoryReceiptService
    {
        private readonly IMongoCollection<AccessoryReceipt> _accessoryReceipt;
        private readonly AccessoryService _accessoryService;
        private readonly AccessoryTypeService _accTypeService;
        private readonly ProviderService _providerService;

        public AccessoryReceiptService(IGaraDatabaseSettings settings, AccessoryService accessoryService, AccessoryTypeService accessoryTypeService, ProviderService providerService)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _accessoryReceipt = database.GetCollection<AccessoryReceipt>(settings.AccessoryReceiptCollectionName);
            _accessoryService = accessoryService;
            _accTypeService = accessoryTypeService;
            _providerService = providerService;
        }

        public List<AccessoryReceipt> Get() =>
            _accessoryReceipt.Find(accessoryReceipt => true).ToList();


        public AccessoryReceipt Get(string id) =>
            _accessoryReceipt.Find<AccessoryReceipt>(accessoryReceipt => accessoryReceipt.Id == id).FirstOrDefault();

        public string Create(UserClaim creator, List<AccessoryInputModel> model)
        {
            try
            {
                var accessories = model.ConvertAll<Accessory>(input =>
                {
                    var provider = _providerService.Get(input.ProviderId);
                    var type = _accTypeService.Get(input.AccessoryTypeId);
                    return new Accessory()
                    {
                        Name = input.Name,
                        Quantity = input.Quantity,
                        Unit = input.Unit,
                        Provider = provider,
                        AccessoryType = type,
                        ReceiptPrice = input.ReceiptPrice,
                        ExpiredDate = DateTime.Now.AddYears(input.ExpiredTime),
                        Description = input.Description
                    };
                });
                var res = _accessoryService.Create(accessories);
                if (res == null)
                {
                    return null;
                }
                int index = -1;
                var details = res.ConvertAll<AccessoryReceiptDetail>(accessory =>
                {
                    index++;
                    return new AccessoryReceiptDetail()
                    {
                        Quantity = accessory.Quantity,
                        UnitPrice = accessory.ReceiptPrice,
                        Unit = accessory.Unit,
                        AccessoryId = accessory.Id,
                        ExpiredTime = model[index].ExpiredTime
                    };
                });

                double total = details.Sum(detail => detail.Quantity * detail.UnitPrice);

                AccessoryReceipt newReceipt = new AccessoryReceipt()
                {
                    CreatedDate = DateTime.Now,
                    Creator = creator,
                    TotalAmount = total,
                    Details = details.ToArray()
                };

                _accessoryReceipt.InsertOne(newReceipt);
                return newReceipt.Id;
            }
            catch
            {
                return null;
            }

        }
        public IEnumerable<Object> Accept(IReportVisitor visitor)
        {
            return visitor.ExportAccessoryReceiptReport(this._accessoryReceipt);
        }
        public void Update(string id, AccessoryReceipt accessoryReceiptIn) =>
            _accessoryReceipt.ReplaceOne(accessoryReceipt => accessoryReceipt.Id == id, accessoryReceiptIn);

        public void Remove(AccessoryReceipt accessoryReceiptIn) =>
            _accessoryReceipt.DeleteOne(accessoryReceipt => accessoryReceipt.Id == accessoryReceiptIn.Id);

        public void Remove(string id) =>
            _accessoryReceipt.DeleteOne(accessoryReceipt => accessoryReceipt.Id == id);

        public AccessoryReceiptDetail[] GetDetails(string id) =>
            _accessoryReceipt.Find(accReceipt => accReceipt.Id == id).Project(accReceipt => accReceipt.Details).FirstOrDefault();
    }
}