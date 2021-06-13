using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Models;
using GaraApi.Services.Identity;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace GaraApi.Services
{
    public class RepairedRequestService
    {
        private readonly IMongoCollection<RepairedRequest> _repairedRequest;
        private readonly UserService _userSerivce;

        public RepairedRequestService(IGaraDatabaseSettings settings, UserService userSerivce)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userSerivce = userSerivce;
            _repairedRequest = database.GetCollection<RepairedRequest>(settings.RepairedRequestCollectionName);
        }

        public List<RepairedRequest> Get() =>
            _repairedRequest.Find(repairedRequest => true).ToList();

        public RepairedRequest Get(string id) =>
            _repairedRequest.Find<RepairedRequest>(repairedRequest => repairedRequest.Id == id).FirstOrDefault();

        public string Create(string userId, RepairedRequestModel repairedRequestModel)
        {
            double totalAmount = 0;
            var details = repairedRequestModel.Details;
            for (int i = 0; i < details.Count; i++){
                details[i].Amount = details[i].Quantity*details[i].UnitPrice + details[i].LaborCost;
                totalAmount += details[i].Amount;
            }
            var userclaim = _userSerivce.GetClaim(userId);
            RepairedRequest repairedRequest = new RepairedRequest()
                {
                    CarId = repairedRequestModel.CarId,
                    CustomerId = repairedRequestModel.CustomerId, 
                    CreatedDate = System.DateTime.Now,
                    Creator = userclaim,
                    TotalAmount = totalAmount,
                    Details = details,
                    State = "Đang tiến hành" // "Hủy" .. "Đã xác nhận" .. "Đã xuất"
                };
            _repairedRequest.InsertOne(repairedRequest);
            return repairedRequest.Id;
        }

        public void Update(string id, RepairedRequest repairedRequestIn) =>
            _repairedRequest.ReplaceOne(repairedRequest => repairedRequest.Id == id, repairedRequestIn);

        public void Remove(RepairedRequest repairedRequestIn) =>
            _repairedRequest.DeleteOne(repairedRequest => repairedRequest.Id == repairedRequestIn.Id);

        public void Remove(string id) =>
            _repairedRequest.DeleteOne(repairedRequest => repairedRequest.Id == id);
    }
}