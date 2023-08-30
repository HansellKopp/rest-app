using Api.Features.Products.Models;

namespace Api.Features.Products.Dtos;
public class ProductDTO
{
    public Guid? Id { get; set; }
    public string Name { get; set; } = "";
    public Double Price { get; set; }
    public Double Tax { get; set; }
    public string? Image { get; set; }
    public required CategoryDTO Category { get; set; }

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
                Id = (Guid)Category.Id!,
                Name = Category.Name,
                Image = Category.Image,
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
            Category = new CategoryDTO
            {
                Id = product.Category!.Id!,
                Name = product.Category.Name,
                Image = product.Category.Image,
            }
        };
    }
}
