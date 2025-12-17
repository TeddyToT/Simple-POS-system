using Microsoft.AspNetCore.Mvc;
using POS_Backend.Models;
using POS_Backend.Services;
using POS_Backend.Common;
using POS_Backend.DTOs;

namespace POS_Backend.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }
        [HttpGet]
        public IActionResult GetProducts(
            [FromQuery] PagingRequest request)
        {
            var (items, total) = _productService.GetProducts(request.Page, request.Limit);
            var totalPages = (int)Math.Ceiling(total / (double)request.Limit);

            var response = new ApiResponse<List<Product>>
            {
                Success = true,
                Message = "Products retrieved successfully",
                Data = items,
                Total = total,
                Page = request.Page,
                Limit = request.Limit,
                TotalPages = totalPages
            };

            return Ok(response);
        }
    }
            
}
