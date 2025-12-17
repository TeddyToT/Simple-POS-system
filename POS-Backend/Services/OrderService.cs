using Microsoft.Extensions.Caching.Memory;
using POS_Backend.DTOs;
using POS_Backend.Models;

namespace POS_Backend.Services
{
    public class OrderService
    {
        private const string CACHE_KEY = "ORDERS";
        private readonly IMemoryCache _cache;
        private readonly ProductService _productService;

        public OrderService(
            IMemoryCache cache,
            ProductService productService)
        {
            _cache = cache;
            _productService = productService;
        }

        public List<Order> GetOrders()
        {
            return _cache.GetOrCreate(CACHE_KEY, _ => new List<Order>())!;
        }

        public (List<Order> Items, int Total) GetOrdersPaged(int pageIndex, int limit)
        {
            var orders = _cache.GetOrCreate(CACHE_KEY, _ => new List<Order>())!;
            var total = orders.Count;

            var items = orders
                .Skip((pageIndex - 1) * limit)
                .Take(limit)
                .ToList();

            return (items, total);
        }

        public Order CreateOrder(CreateOrderRequest request)
        {
            if (request.Items == null || !request.Items.Any())
                throw new ArgumentException("Order must contain at least one item.");

            var order = new Order();

            foreach (var item in request.Items)
            {
                if (item.Quantity <= 0)
                    throw new ArgumentException("Quantity must be greater than zero.");

                var product = _productService.GetById(item.ProductId);
                if (product == null)
                    throw new ArgumentException($"Product {item.ProductId} not found.");

                order.Items.Add(new OrderItem
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    UnitPrice = product.Price,
                    Quantity = item.Quantity
                });
            }

            var orders = GetOrders();
            orders.Add(order);
            _cache.Set(CACHE_KEY, orders);

            return order;
        }
    }
}
