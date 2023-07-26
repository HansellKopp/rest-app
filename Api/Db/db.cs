using Api.Features.Producs.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Db;

class Dbc : DbContext
{
    public Dbc(DbContextOptions<Dbc> options)
        : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Departament> Departaments => Set<Departament>();
}