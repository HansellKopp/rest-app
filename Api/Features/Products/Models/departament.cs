namespace Api.Features.Producs.Models;
public class Departament
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public ICollection<Product>? Products { get; set; }
}