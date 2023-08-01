namespace Api.Features.Producs.Models;
public class CategoryDTO
{
    public Guid? Id { get; set; }
    public required string Name { get; set; }
    public string Image { get; set; }

    public static explicit operator CategoryDTO(Category Category)
    {
        return new CategoryDTO
        {
            Id = Category.Id,
            Name = Category.Name,
            Image = Category.Image,
        };
    }
}