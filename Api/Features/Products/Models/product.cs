using Api.Models;
using Api.Features.Producs.Dtos;

namespace Api.Features.Producs.Models;
public class Product : BaseEntity
{
    public Guid CategoryId { get; set; }
    public required string Name { get; set; }
    public Double Price { get; set; }
    public Double Tax { get; set; }
    public string? Image { get; set; }
    public virtual Category? Category { get; set; }

}