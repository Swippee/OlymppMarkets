
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using OlymppMarketsAPI.Application.Mappings;
using OlymppMarketsAPI.Application.Queries;
using OlymppMarketsAPI.Domain.Entities;
using OlymppMarketsAPI.Domain.Interfaces;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace OlymppMarketsAPI.Tests.MSunitTest.Handlers
{
    [TestClass]
    public class GetProduct2ByIdQueryHandlerTests
    {
        private IMapper _mapper;
        private Mock<IProductRepository> _productRepositoryMock;
        private GetProductByIdQueryHandler _handler;

        [TestInitialize]
        public void Setup()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            _mapper = config.CreateMapper();

            _productRepositoryMock = new Mock<IProductRepository>();
            _handler = new GetProductByIdQueryHandler(_productRepositoryMock.Object, _mapper);
        }

        [TestMethod]
        public async Task Handle_ReturnsProductDto2()
        {
            // Arrange
            var product = new Product
            {
                Id = 1,
                Name = "Test Product",
                Brand = "Test Brand",
                Size = "M",
                Price = new Price { Id = 1, Amount = 99.99M },
                Stock = new Stock { Id = 1, Quantity = 10 }
            };

            _productRepositoryMock.Setup(repo => repo.GetProductByIdAsync(1))
                .ReturnsAsync(product);

            var query = new GetProductByIdQuery(1);

            // Act
            var result = await _handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(product.Id, result.Id);
            Assert.AreEqual(product.Name, result.Name);
            Assert.AreEqual(product.Brand, result.Brand);
            Assert.AreEqual(product.Size, result.Size);
            Assert.AreEqual(product.Price.Amount, result.Price);
            Assert.AreEqual(product.Stock.Quantity, result.Stock);
        }
    }
}
