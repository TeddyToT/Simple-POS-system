using System.ComponentModel.DataAnnotations;

namespace POS_Backend.DTOs
{
    public class PagingRequest
    {
        [Range(1, int.MaxValue, ErrorMessage = "Page must be greater than 0.")]
        public int Page { get; set; } = 1;

        [Range(1, int.MaxValue, ErrorMessage = "Limit must be greater than 0.")]
        public int Limit { get; set; } = 10;
    }
}
