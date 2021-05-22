using System.Collections.Generic;
using GaraApi.Entities;
using GaraApi.Entities.Identity;
using MongoDB.Driver;

namespace GaraApi.Services.Identity
{
    public class UserRoleService
    {
        private readonly IMongoCollection<UserRole> _role;
        public UserRoleService(IGaraDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _role = database.GetCollection<UserRole>(settings.UserRoleCollectionName);
        }

        public List<UserRole> Get() =>
            _role.Find(role => true).ToList();

    }
}