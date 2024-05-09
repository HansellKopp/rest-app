using System.Text.Json.Serialization;
using Api.Models;
using Microsoft.Extensions.Hosting;

namespace Api.Features.Products.Models;
public class Category : BaseEntity
{
    public required string Name { get; set; }
    public string? Image { get; set; }
    public ICollection<Product> Products { get; } = new List<Product>();
}