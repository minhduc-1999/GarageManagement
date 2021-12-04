using System;
using System.Linq;
using GaraApi.Controllers;
using GaraApi.Entities;
using GaraApi.Entities.Form;
using GaraApi.Entities.Identity;
using GaraApi.Models;
using GaraApi.Services;
using GaraApi.Services.Identity;
using GaraApi.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Moq;
using NUnit.Framework;

namespace garaapi_test.TestRepaireRequest
{
    [TestFixture]
    public class RepaireRequestTest
    {
        private AppSettings _appSettings;

        private RepairedRequestsController controller;

        [SetUp]
        public void Setup()
        {

            var _repaireReqServiceMock = new Mock<IRepairedRequestService>();
            _repaireReqServiceMock.Setup(x => x.Create(It.IsAny<string>(), It.IsAny<RepairedRequestModel>())).Returns(() => "rr1");
            controller = new RepairedRequestsController(_repaireReqServiceMock.Object, null);
            controller.ControllerContext = new Microsoft.AspNetCore.Mvc.ControllerContext();
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Items["User"] = new User()
            {
                Id = "user1"
            };
        }

        [Test]
        // [TestCaseSource(typeof(LoginToLockedAccountCases))]
        public void Should_Return_RR_ID()
        {
            var result = controller.Create(new RepairedRequestModel()
            {
                CarId = "",
                CustomerId = "",
                quotation = null
            });
            Assert.AreEqual((result.Result as CreatedAtRouteResult).Value, "rr1");
        }

    }
}