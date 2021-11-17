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
        private readonly IUserService _userSerivce;

        public RepairedRequestService(IGaraDatabaseSettings settings, IUserService userSerivce)
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
            var details = repairedRequestModel.quotation.Details;
            for (int i = 0; i < details.Count; i++)
            {
                details[i].Amount = details[i].Quantity * details[i].UnitPrice + details[i].LaborCost;
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
                Quotation = repairedRequestModel.quotation,
                State = RepairedRequest.RepairedRequestState.init // "Hủy" .. "Đã xác nhận" .. "Đã xuất"
            };
            _repairedRequest.InsertOne(repairedRequest);
            return repairedRequest.Id;
        }

        public bool Update(RepairedRequest repairedRequestIn, RepairedRequestUpdateModel repReqUpdateIn)
        {
            double totalAmount = 0;
            var details = repReqUpdateIn.quotation.Details;
            for (int i = 0; i < details.Count; i++)
            {
                details[i].Amount = details[i].Quantity * details[i].UnitPrice + details[i].LaborCost;
                totalAmount += details[i].Amount;
            }

            repairedRequestIn.CarId = repReqUpdateIn.CarId;
            repairedRequestIn.CustomerId = repReqUpdateIn.CustomerId;
            repairedRequestIn.Quotation = repReqUpdateIn.quotation;
            repairedRequestIn.TotalAmount = totalAmount;
            repairedRequestIn.State = repReqUpdateIn.RRState;
            var res = _repairedRequest.ReplaceOne(repairedRequest => repairedRequest.Id == repairedRequestIn.Id, repairedRequestIn);
            if (!res.IsAcknowledged)
                return false;
            return true;
        }
        public void Remove(RepairedRequest repairedRequestIn) =>
            _repairedRequest.DeleteOne(repairedRequest => repairedRequest.Id == repairedRequestIn.Id);

        public void Remove(string id) =>
            _repairedRequest.DeleteOne(repairedRequest => repairedRequest.Id == id);


        public List<QuotationDetail> GetQuotationDetails(string id)
        {
            return _repairedRequest.Find(rr => rr.Id == id).Project(rr => rr.Quotation.Details).FirstOrDefault();
        }

        public Quotation.QuotationtState? GetQuotationtState(string id)
        {
            return _repairedRequest.Find(rr => rr.Id == id).Project(rr => rr.Quotation.State).FirstOrDefault();
        }
    }
}