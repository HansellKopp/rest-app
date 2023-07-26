using Api.Features.Producs.Models;

namespace Api.Features.Producs.Dtos;
public class ProductDTO
{
    public int? Id { get; set; }
    required public string Name { get; set; }
    required public Double Price { get; set; }
    required public Double Tax { get; set; }
    required public int DepartamentId { get; set; }
    public string? DepartamentName { get; set; }

    public Product ToProduct()
    {
        return new Product
        {
            Name = Name,
            Price = Price,
            Tax = Tax,
            Departament = new Departament
            {
                Id = DepartamentId,
                Name = DepartamentName ?? ""
            }
        };
    }

    public static explicit operator ProductDTO(Product product)
    {
        return new ProductDTO
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            Tax = product.Tax,
            DepartamentId = product.Departament.Id,
            DepartamentName = product.Departament.Name,
        };
    }
}
