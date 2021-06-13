
// using System.Collections.Generic;
// using GaraApi.Entities;
// using GaraApi.Entities.Form;
// using GaraApi.Services.Identity;
// using MongoDB.Driver;

// namespace GaraApi.Services
// {
//     public class QuotationService
//     {
//         private readonly IMongoCollection<Quotation> _quotation;
//         private readonly UserService _userSerivce;
//         public QuotationService(IGaraDatabaseSettings settings,UserService userSerivce)
//         {
//             var client = new MongoClient(settings.ConnectionString);
//             var database = client.GetDatabase(settings.DatabaseName);
            
//             _quotation = database.GetCollection<Quotation>(settings.QuotationCollectionName);
//             _userSerivce = userSerivce;
//         }

//         public List<Quotation> Get() =>
//             _quotation.Find(quotation => true).ToList();

//         public Quotation Get(string id) =>
//             _quotation.Find<Quotation>(quotation => quotation.Id == id).FirstOrDefault();

//         public string Create(string userId, List<QuotationDetail> details)
//         {
//             double totalAmount = 0;
//             for (int i = 0; i < details.Count; i++){
//                 details[i].Amount = details[i].Quantity*details[i].UnitPrice + details[i].LaborCost;
//                 totalAmount += details[i].Amount;
//             }
//             var userclaim = _userSerivce.GetClaim(userId);
//             Quotation quotation = new Quotation()
//                 {
//                     CreatedDate = System.DateTime.Now,
//                     Creator = userclaim,
//                     //TotalAmount = totalAmount,
//                     Details = details,
//                     State = "Chờ xác nhận" // "Hủy" .. "Đã xác nhận" .. "Đã xuất"
//                 };
//             //Quotation quotation = new Quotation(details,"Đang tiến hành",totalAmount);
//             _quotation.InsertOneAsync(quotation);
//             return quotation.Id;
//         }

//         public void Update(string id, Quotation quotationIn) =>
//             _quotation.ReplaceOne(quotation => quotation.Id == id, quotationIn);

//         public void Remove(Quotation quotationIn) =>
//             _quotation.DeleteOne(quotation => quotation.Id == quotationIn.Id);

//         public void Remove(string id) =>
//             _quotation.DeleteOne(quotation => quotation.Id == id);

//       //  public List<Dictionary<string,QuotationDetail>> GetDetails(string id) =>
//         //    _quotation.Find(quotation => quotation.Id == id).FirstOrDefault().Details;
//     }
// }