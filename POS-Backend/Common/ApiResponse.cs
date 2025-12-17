namespace POS_Backend.Common
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public int? Total { get; set; }
        public int? Page {  get; set; }
        public int? Limit { get; set; }
        public int? TotalPages { get; set; }
    }
}
