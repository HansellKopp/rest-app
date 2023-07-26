using Api.Features.Producs.Dtos;

namespace Api.Features.Producs.Models;
public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public Double Price { get; set; }
    public Double Tax { get; set; }
    public required Departament Departament { get; set; }
}