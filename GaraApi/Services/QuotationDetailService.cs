using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using MongoDB.Driver;

namespace GaraApi.Services
{
    public class QuotationDetailService
    {
        private readonly IMongoCollection<QuotationDetail> _quotationDetail;

        public QuotationDetailService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _quotationDetail = database.GetCollection<QuotationDetail>(settings.QuotationDetailCollectionName);
        }

        public List<QuotationDetail> Get() =>
            _quotationDetail.Find(quotation => true).ToList();

        public QuotationDetail Get(string quotationId, string accessoryId, string laborCostId) =>
            _quotationDetail.Find<QuotationDetail>(quotationDetail => quotationDetail.AccessoryId == accessoryId && 
            quotationDetail.LaborCostId == laborCostId && quotationDetail.QuotationId == quotationId).FirstOrDefault();

        public QuotationDetail Create(QuotationDetail quotation)
        {
            _quotationDetail.InsertOne(quotation);
            return quotation;
        }

        public void Update(string quotationId, string accessoryId, string laborCostId, QuotationDetail quotationDetailIn) =>
            _quotationDetail.ReplaceOne(quotationDetail => quotationDetail.AccessoryId == accessoryId && 
            quotationDetail.LaborCostId == laborCostId && quotationDetail.QuotationId == quotationId, quotationDetailIn);

        public void Remove(QuotationDetail quotationIn) =>
            _quotationDetail.DeleteOne(quotationDetail => quotationDetail.AccessoryId == quotationIn.AccessoryId && 
            quotationDetail.LaborCostId == quotationIn.LaborCostId && quotationDetail.QuotationId == quotationIn.QuotationId);

        public void Remove(string quotationId, string accessoryId, string laborCostId) =>
            _quotationDetail.DeleteOne(quotationDetail => quotationDetail.AccessoryId == accessoryId && 
            quotationDetail.LaborCostId == laborCostId && quotationDetail.QuotationId == quotationId);
    }
}