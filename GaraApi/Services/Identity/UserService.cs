using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Entities.Identity;
using GaraApi.Utils;
using MongoDB.Driver;

namespace GaraApi.Services.Identity
{
    public class UserService
    {
        private readonly IMongoCollection<User> _user;
        public UserService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> Get() =>
            _user.Find(user => true).ToList();

        public User Get(string id) =>
            _user.Find<User>(user => user.Id == id).FirstOrDefault();

        public User GetUserByUsername(string username)
        {
            return _user.Find<User>(user => user.Username == username).FirstOrDefault();
        }

        public User Create(User user)
        {
            _user.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn) =>
            _user.ReplaceOne(user => user.Id == id, userIn);

        public void Remove(User userIn) =>
            _user.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            _user.DeleteOne(user => user.Id == id);

        public bool ResetPass(string id, string newPass)
        {
            var update = Builders<User>.Update.Set("PasswordHash", Helpers.Md5Hash(newPass));
            var res = _user.UpdateOne(user => user.Id == id, update);
            if (res.ModifiedCount == 1)
            {
                return true;
            }
            return false;
        }
    }
}