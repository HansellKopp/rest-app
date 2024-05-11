using Api.Models;
using System.Reflection.Metadata;

namespace Api.Features.Products.Models;

public class Product : BaseEntity
{
    public required string Name { get; set; }
    public Double Price { get; set; }
    public Double Tax { get; set; }
    public string? Image { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!; // Required reference navigation to principal

}