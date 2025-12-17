namespace POS_Backend.Models
{
    public class OrderItem
    {
        public int ProductId { get; set; } = default!;
        public string ProductName { get; set; } = default!;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal LineTotal => UnitPrice * Quantity;
    }
}
