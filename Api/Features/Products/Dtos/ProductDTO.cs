using System;
using Api.Features.Producs.Models;

namespace Api.Features.Producs.Dtos;
public class ProductDTO
{
    public Guid? Id { get; set; }
    required public string Name { get; set; }
    required public Double Price { get; set; }
    required public Double Tax { get; set; }
    required public Guid CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public string? Image { get; set; }

    public Product ToProduct()
    {
        return new Product
        {
            Name = Name,
            Price = Price,
            Tax = Tax,
            Image = Image,
            Category = new Category
            {
                Id = CategoryId,
                Name = CategoryName ?? ""
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
            CategoryId = product.Category.Id,
            CategoryName = product.Category.Name,
        };
    }
}
