using System.Text.Json;
using System.Text.Json.Serialization;
using Api.Models;

namespace Api.Features.Producs.Models;
public class Category : BaseEntity
{
    public required string Name { get; set; }
    public string? Image { get; set; }

    [JsonIgnore]
    public virtual ICollection<Product>? Products { get; set; }
}