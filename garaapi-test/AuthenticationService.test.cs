using GaraApi.Entities.Identity;
using GaraApi.Services.Identity;
using NUnit.Framework;

namespace garaapi_test
{
    [TestFixture]
    public class AuthenticationServiceTest
    {

        [SetUp]
        public void Setup()
        {
            
        }

        [Test]
        [TestCase(12)]
        [TestCase(1)]
        public void TestJwt(int value)
        {
            Assert.IsTrue(value > 10, "has Jwt");
        }
    }
}