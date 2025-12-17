using POS_Backend.Models;

namespace POS_Backend.Services
{
    public class ProductService
    {
        private readonly List<Product> _products = new()
        {
            new Product { Id = 1, Name = "iPhone 11", Price = 10000000 },
            new Product { Id = 2, Name = "iPhone 12", Price = 12000000 },
            new Product { Id = 3, Name = "iPhone 12 Pro", Price = 15000000 },
            new Product { Id = 4, Name = "iPhone 13", Price = 16000000 },
            new Product { Id = 5, Name = "iPhone 13 Pro", Price = 20000000 },
            new Product { Id = 6, Name = "iPhone 14", Price = 18000000 },
            new Product { Id = 7, Name = "iPhone 14 Pro", Price = 24000000 },
            new Product { Id = 8, Name = "iPhone 15", Price = 22000000 },

            new Product { Id = 9, Name = "Samsung Galaxy S21", Price = 12000000 },
            new Product { Id = 10, Name = "Samsung Galaxy S22", Price = 15000000 },
            new Product { Id = 11, Name = "Samsung Galaxy S23", Price = 19000000 },
            new Product { Id = 12, Name = "Samsung Galaxy S23+", Price = 22000000 },
            new Product { Id = 13, Name = "Samsung Galaxy S24", Price = 23000000 },
            new Product { Id = 14, Name = "Samsung Galaxy Z Flip", Price = 20000000 },

            new Product { Id = 15, Name = "Xiaomi Redmi Note 11", Price = 4500000 },
            new Product { Id = 16, Name = "Xiaomi Redmi Note 12", Price = 5500000 },
            new Product { Id = 17, Name = "Xiaomi Redmi 12", Price = 4000000 },
            new Product { Id = 18, Name = "Xiaomi Mi 11", Price = 9000000 },
            new Product { Id = 19, Name = "Xiaomi 12", Price = 11000000 },
            new Product { Id = 20, Name = "Xiaomi 13", Price = 14000000 }
        };

        public (List<Product> Items, int Total) GetProducts(int pageIndex, int limit)
        {
            pageIndex = Math.Max(1, pageIndex);
            limit = Math.Max(1, limit);

            var total = _products.Count;

            var items = _products
                .Skip((pageIndex - 1) * limit)
                .Take(limit)
                .ToList();

            return (items, total);
        }

        public Product? GetById(int id)
        {
            return _products.FirstOrDefault(p => p.Id == id);
        }
    }
}
