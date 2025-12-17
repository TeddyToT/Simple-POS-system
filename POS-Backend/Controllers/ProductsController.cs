using Microsoft.AspNetCore.Mvc;
using POS_Backend.Models;
using POS_Backend.Services;
using POS_Backend.Common;

namespace POS_Backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : Controller
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public IActionResult GetProducts(
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10)
        {
            var (items, total) = _productService.GetProducts(page, limit);
            var totalPages = (int)Math.Ceiling(total / (double)limit);

            var response = new ApiResponse<List<Product>>
            {
                Success = true,
                Message = "Products retrieved successfully",
                Data = items,
                Total = total,
                Page = page,
                Limit = limit,
                TotalPages = totalPages
            };

            return Ok(response);
        }
    }
            
}
