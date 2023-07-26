namespace Api.Features.Producs.Models;
public class DepartamentDTO
{
    public int? Id { get; set; }
    public required string Name { get; set; }

    public static explicit operator DepartamentDTO(Departament departament)
    {
        return new DepartamentDTO
        {
            Id = departament.Id,
            Name = departament.Name,
        };
    }
}