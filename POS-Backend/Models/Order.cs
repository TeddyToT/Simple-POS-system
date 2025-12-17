namespace POS_Backend.Models
{
    public class Order
    {
        public Guid OrderId { get; set; } = Guid.NewGuid();
        public List<OrderItem> Items { get; set; } = new();
        public decimal TotalAmount => Items?.Sum(i => i.LineTotal) ?? 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
