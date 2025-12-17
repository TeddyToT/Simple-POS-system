using Microsoft.AspNetCore.Mvc;
using POS_Backend.Models;
using POS_Backend.Services;
using POS_Backend.Common;
using POS_Backend.DTOs;

namespace POS_Backend.Controllers
{
    [ApiController]
    [Route("/api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
        {
            try
            {
                var order = _orderService.CreateOrder(request);
                var response = new ApiResponse<Order>
                {
                    Success = true,
                    Message = "Create Order successfully",
                    Data = order
                };
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ApiResponse<string>
                {
                    Success = false,
                    Message = ex.Message,
                    Data = null
                });
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse<string>
                {
                    Success = false,
                    Message = "Something went wrong",
                    Data = null,
                });
            }

        }

        [HttpGet]
        public IActionResult GetOrders([FromQuery] PagingRequest request)
        {
            var (items, total) = _orderService.GetOrdersPaged(request.Page, request.Limit);
            var response = new ApiResponse<List<Order>>
            {
                Success = true,
                Message = "Orders retrieved successfully",
                Data = items,
                Total = total,
                Page = request.Page,
                Limit = request.Limit,
                TotalPages = (int)Math.Ceiling(total / (double)request.Limit)
            };

            return Ok(response);
        }
    }

}
