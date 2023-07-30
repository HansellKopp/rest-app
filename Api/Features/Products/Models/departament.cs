using Api.Models;

namespace Api.Features.Producs.Models;
public class Departament : BaseEntity
{
    public required string Name { get; set; }
    public virtual ICollection<Product>? Products { get; set; }
}